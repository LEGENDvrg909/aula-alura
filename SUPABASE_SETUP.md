# Login de administrador

O administrador permitido nesta configuracao e o usuario GitHub `adm01bryan`.
O login usa Supabase Auth com GitHub OAuth; nao publique o segredo OAuth no repositorio.

## Configuracao

1. Crie um projeto no Supabase.
2. Em Authentication > Providers, habilite GitHub e cadastre o Client ID e Client Secret de um GitHub OAuth App. O callback mostrado pelo Supabase deve ser configurado no OAuth App do GitHub.
3. Em Authentication > URL Configuration, adicione a URL do GitHub Pages e `http://localhost:8000` como URLs permitidas de redirecionamento.
4. Execute `supabase/admin-allowlist.sql` no SQL Editor do Supabase.
5. Copie a Project URL e a chave publica (publishable/anon) para `supabase-config.js`. Esses valores sao publicos; a protecao depende das regras do banco.
6. Publique o site e entre uma vez com a conta GitHub `adm01bryan`.
7. Em Authentication > Users, copie o UUID dessa conta e execute no SQL Editor:

```sql
insert into public.admin_allowlist (user_id)
values ('SEU_UUID_DO_SUPABASE');
```

Depois disso, o botao de login mostra o selo ADMIN somente quando a sessao do GitHub e aprovada por `public.is_admin()`.

## Importante

O saldo e o guarda-roupa atuais do jogo continuam no navegador. Para proteger moedas e compras contra alteracao pelo console do navegador, tambem sera necessario migrar esses dados para tabelas Supabase com politicas RLS e operacoes no servidor.