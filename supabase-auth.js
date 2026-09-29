(() => {
  const config = window.SUPABASE_CONFIG;
  const button = document.querySelector("#botao-admin-auth");
  const status = document.querySelector("#status-admin-auth");
  const placeholderValues = [
    "COLE_A_URL_DO_PROJETO_SUPABASE",
    "COLE_A_CHAVE_PUBLICA_DO_SUPABASE"
  ];

  function publishAdminState(isAdmin) {
    window.dispatchEvent(new CustomEvent("quiziz-admin-state", {
      detail: { isAdmin }
    }));
  }

  function showStatus(message) {
    status.textContent = message;
    status.classList.toggle("hidden", !message);
  }

  if (!config || placeholderValues.includes(config.url) || placeholderValues.includes(config.publishableKey)) {
    return;
  }

  if (!window.supabase?.createClient) {
    showStatus("Não foi possível carregar o serviço de login.");
    return;
  }

  button.classList.remove("hidden");
  const client = window.supabase.createClient(config.url, config.publishableKey);
  let sessaoAtual = null;

  async function atualizarAcesso(session) {
    sessaoAtual = session;
    if (!session) {
      publishAdminState(false);
      button.textContent = "Entrar com GitHub";
      showStatus("");
      return;
    }

    const nomeGitHub = session.user.user_metadata?.user_name?.toLowerCase();
    const correspondeAoGitHub = nomeGitHub === config.adminGithubUsername.toLowerCase();
    let autorizado = false;

    if (correspondeAoGitHub) {
      const { data, error } = await client.rpc("is_admin");
      autorizado = !error && data === true;
    }

    publishAdminState(autorizado);
    button.textContent = "Sair";
    showStatus(autorizado ? `Administrador conectado: @${nomeGitHub}` : "Esta conta não tem acesso de administrador.");
  }

  client.auth.onAuthStateChange((_evento, session) => {
    window.setTimeout(() => atualizarAcesso(session), 0);
  });

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      showStatus("Não foi possível verificar sua sessão do GitHub.");
      return;
    }
    return atualizarAcesso(data.session);
  });

  button.addEventListener("click", async () => {
    button.disabled = true;
    if (sessaoAtual) {
      const { error } = await client.auth.signOut();
      if (error) showStatus("Não foi possível sair da sessão.");
    } else {
      const { error } = await client.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}${window.location.pathname}` }
      });
      if (error) showStatus("Não foi possível iniciar o login do GitHub.");
    }
    button.disabled = false;
  });
})();