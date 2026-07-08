# Supabase Setup

## Checklist

- [ ] Criar um projeto no Supabase
- [ ] Copiar a `Project URL`
- [ ] Copiar a `anon public key`
- [ ] Criar o arquivo `mobile/.env`
- [ ] Preencher `EXPO_PUBLIC_SUPABASE_URL=`
- [ ] Preencher `EXPO_PUBLIC_SUPABASE_ANON_KEY=`
- [ ] Abrir `Authentication` e ativar login por `Email`
- [ ] Rodar `mobile/supabase/migrations/20260701_init_auth_and_data.sql` no `SQL Editor`
- [ ] Rodar `mobile/supabase/seed.sql` no `SQL Editor`
- [ ] Abrir o app e testar `Criar conta com e-mail`
- [ ] Verificar o novo registro em `auth.users`
- [ ] Verificar o novo registro em `public.profiles`
- [ ] Verificar os habitos padrao em `public.habits`

## Variaveis de ambiente

Crie um arquivo `.env` na pasta `mobile/` com:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Use como base o arquivo `.env.example`.

## Auth no painel do Supabase

No projeto Supabase:

1. Abra `Authentication`.
2. Ative `Email` como provider.
3. Escolha se o cadastro vai exigir confirmacao por e-mail.

Se a confirmacao estiver ligada, o app vai criar a conta, mas o primeiro login so funciona depois da confirmacao.

## Banco de dados

Rode no `SQL Editor`:

1. `supabase/migrations/20260701_init_auth_and_data.sql`
2. `supabase/seed.sql`

Isso cria:

- tabelas principais do app
- trigger para criar `profiles`, `daily_goals` e habitos padrao ao criar `auth.users`
- RLS por usuario
- seed complementar para usuarios ja existentes

## Como testar login

1. Rode o app Expo:

```bash
npx expo start --offline
```

2. Abra a tela de login.
3. Toque em `Criar conta com e-mail`.
4. Informe nome, e-mail e senha.
5. Se o Auth exigir confirmacao por e-mail, confirme o cadastro.
6. Volte ao app e use `Entrar`.

## O que ja usa Supabase

- Login real
- Cadastro simples com `metadata.name`
- Logout real
- Restauracao de sessao
- Rotas protegidas com redirecionamento
- Profile/metas com leitura real ou fallback mockado
- Habitos com leitura real ou fallback mockado

## O que ainda esta mockado

- dashboard completo
- historico de refeicoes real
- peso, agua e exercicios reais
- analise de comida por IA
- camera, upload e storage
