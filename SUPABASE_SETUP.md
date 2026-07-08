# Supabase Setup

## 1. Variaveis de ambiente

Crie um arquivo `.env` na pasta `mobile/` com:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

Use como base o arquivo `.env.example`.

## 2. Auth no painel do Supabase

No projeto Supabase:

1. Abra `Authentication`.
2. Ative `Email` como provider.
3. Escolha se o cadastro vai exigir confirmacao por e-mail.

Se a confirmacao estiver ligada, o app vai criar a conta, mas o primeiro login so funciona depois da confirmacao.

## 3. Banco de dados

Rode o SQL desta migration no `SQL Editor`:

`supabase/migrations/20260701_init_auth_and_data.sql`

Depois rode o seed:

`supabase/seed.sql`

Isso cria:

- tabelas principais do app
- trigger de `profiles`/`daily_goals`/habitos ao criar `auth.users`
- RLS por usuario
- seed dos habitos padrao

## 4. Como testar login

1. Rode o app Expo:

```bash
npx expo start
```

2. Abra a tela de login.
3. Use `Criar conta com e-mail` e informe nome, e-mail e senha.
4. Se o Auth exigir confirmacao por e-mail, confirme o cadastro.
5. Use `Entrar`.

## 5. O que ja usa Supabase

- Login real
- Cadastro simples
- Logout real
- Restauracao de sessao
- Profile/metas com leitura real ou fallback mockado
- Habitos com leitura real ou fallback mockado

## 6. O que ainda nao usa Supabase de ponta a ponta

- dashboard completo
- historico de refeicoes real
- peso/agua/exercicios reais
- analise de comida por IA
- camera e storage
