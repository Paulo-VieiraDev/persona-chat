# PersonaChat 💬

Bem-vindo ao PersonaChat! Um aplicativo de chat inovador onde você pode conversar com um elenco de personalidades de IA, cada uma com seu próprio humor, conhecimento e estilo de conversa. Desenvolvido para explorar as capacidades da API do Google Gemini em um ambiente interativo e divertido.

## 💡 Sobre o Projeto

PersonaChat é uma aplicação full-stack que simula um app de mensagens, mas em vez de falar com pessoas, você interage com diferentes IAs. Cada "persona" foi cuidadosamente projetada com um prompt de sistema detalhado para lhe dar uma personalidade única, desde um irmão mais novo irritante até uma tia religiosa carinhosa.

Este projeto foi construído do zero, focando em uma experiência de usuário limpa, responsiva e moderna.

### ✨ Funcionalidades Principais

* **Múltiplas Personalidades de IA:** Converse com 6 personagens distintos, como Juninho Bro, Penélope Charmosa, Tio Roberto e mais.
* **Histórico de Conversa:** Suas conversas com cada persona são salvas no seu navegador (`localStorage`), para que você possa continuar de onde parou.
* **Design Responsivo:** Experiência de usuário perfeita em desktops, tablets e celulares.
* **Status de Mensagem:** Indicadores de status de "enviado" (✔) e "lido" (✔✔) em tempo real.
* **Interface Moderna:** UI limpa e intuitiva, inspirada nos melhores aplicativos de mensagem do mercado.

---

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o Frontend e o Backend.

| Frontend                                                                                                                          | Backend                                                                                                                       | Deploy                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                           | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)                         | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                     |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                                 | ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)                             | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)                    |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)                   | ![Google Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white) |                                                                                                                          |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)             |                                                                                                                               |                                                                                                                          |

---

## 🚀 Como Começar

Siga estas instruções para rodar o projeto na sua máquina local.

### Pré-requisitos

Você vai precisar ter as seguintes ferramentas instaladas:
* [Node.js](https://nodejs.org/en/) (que inclui o npm)
* [Python](https://www.python.org/downloads/) (versão 3.8 ou superior)
* Git

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Paulo-VieiraDev/persona-chat.git
    cd persona-chat
    ```

2.  **Configure o Backend (Python/Flask):**
    ```bash
    # Navegue para a pasta do backend
    cd backend

    # Crie e ative um ambiente virtual
    python -m venv venv
    .\venv\Scripts\activate  # No Windows
    # source venv/bin/activate  # No macOS/Linux

    # Instale as dependências
    pip install -r requirements.txt

    # Crie um arquivo chamado .env e adicione sua chave da API
    # (substitua SUA_CHAVE_AQUI pela sua chave real)
    echo GOOGLE_API_KEY=SUA_CHAVE_AQUI > .env
    ```

3.  **Configure o Frontend (Next.js):**
    ```bash
    # Volte para a raiz e entre na pasta do frontend
    cd ../frontend

    # Instale as dependências
    npm install
    ```

### ▶️ Executando a Aplicação

Você precisará de **dois terminais** abertos para rodar o projeto.

**No Terminal 1 - Inicie o Backend:**
```bash
cd backend
.\venv\Scripts\activate
flask run
```
> O backend estará rodando em `http://localhost:5000`.

**No Terminal 2 - Inicie o Frontend:**
```bash
cd frontend
npm run dev
```
> O frontend estará rodando em `http://localhost:3000`.

Agora, abra `http://localhost:3000` no seu navegador para ver o PersonaChat em ação!



## 👨‍💻 Autor

**Paulo Vieira**

* **Data:** Julho de 2025