# Institucional e Sistema de Gestão de Abastecimentos

Este é um projeto para portfólio que contém um site institucional modelo para a Objetiva Representações com sistema para gerenciamento de recibos de abastecimento, projetado para otimizar o controle de despesas de combustível para equipes de vendas. A aplicação permite que vendedores registrem seus abastecimentos, incluindo fotos das quilometragens inicial e final da rota, e que gestores visualizem e gerenciem todos os registros em um painel centralizado.

## ✨ Funcionalidades Principais

- **Site Institucional**: Página inicial (Landing Page), contato, login e registro de usuários.
- **Autenticação Segura**: Sistema de login e registro de usuários utilizando Firebase Authentication.
- **Painel de Controle (Dashboard)**: Visualização centralizada de todos os recibos de abastecimento. O painel é dinâmico e exibe informações com base no perfil do usuário (vendedor ou gestor).
- **Controle de Acesso Baseado em Perfil (Role-Based Access Control)**:
  - **Gestores (Managers)**: Têm acesso a todos os recibos registrados no sistema.
  - **Vendedores (Sellers)**: Visualizam apenas os seus próprios registros.
- **Registro de Abastecimento**: Formulário intuitivo para que os vendedores registrem novos abastecimentos, com campos para localização, valor, quilometragem inicial e final.
- **Upload de Imagens**: Funcionalidade de upload de fotos do odômetro (inicial e final) diretamente para o armazenamento em nuvem (Cloudflare R2), garantindo a veracidade dos dados.
- **Edição e Gerenciamento de Recibos**: Um modal interativo permite visualizar detalhes, editar informações e excluir recibos.
- **Busca e Filtragem**: Funcionalidade de busca no painel para filtrar recibos por localização ou usuário.
- **Design Responsivo**: Interface moderna e totalmente responsiva, construída com Tailwind CSS.
- **Feedback Visual com Notificações**: Utilização de toasts (react-toastify) para fornecer feedback instantâneo sobre o resultado das ações do usuário (login, logout, registro, criação, edição e exclusão de dados).

## 🚀 Tecnologias Utilizadas

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Ícones**: [Heroicons](https://heroicons.com/)
- **Componentes de UI**: [Headless UI](https://headlessui.com/)

### Backend & Infraestrutura
- **Ambiente de Execução**: [Node.js](https://nodejs.org/)
- **API**: Next.js API Routes
- **Autenticação**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Banco de Dados**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Armazenamento de Arquivos**: [Cloudflare R2](https://www.cloudflare.com/pt-br/developer-platform/r2/) (via AWS S3 SDK)

### Ferramentas de Desenvolvimento
- **Linting**: [ESLint](https://eslint.org/)
- **Build Tool**: Next.js (integrado)

## 🔧 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:AssFerj/objetiva-representacao.git
    cd objetiva-representacao
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de `.env.example`.
    - Preencha as variáveis de ambiente com suas credenciais do Firebase e do Cloudflare R2 e quaisquer variáveis de ambiente adicionais necessárias.

    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...

    # Cloudflare R2 Configuration
    CLOUDFLARE_ACCOUNT_ID=...
    CLOUDFLARE_ACCESS_KEY_ID=...
    CLOUDFLARE_SECRET_ACCESS_KEY=...
    CLOUDFLARE_BUCKET_NAME=...
    CLOUDFLARE_PUBLIC_URL=...
    ```

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

6.  **Demo (Manager):**
    - Email: admin@mail.com
    - Senha: 123456
    - Role: manager
    
7.  **Demo (Seller):**
    - Email: seller@mail.com
    - Senha: 123456
    - Role: seller
    
8.  **Demo (Seller):**
    - Email: seller1@mail.com
    - Senha: 123456
    - Role: seller
