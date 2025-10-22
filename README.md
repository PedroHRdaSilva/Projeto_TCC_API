#CashTrack

Este repositório contém o código completo do projeto **CashTrack**, composto por duas partes:

- **API (Backend)** — responsável pelas regras de negócio, autenticação e integração com o banco de dados.


---

## 🚀 Requisitos

Antes de começar, verifique se o ambiente possui:

- Sistema operacional **Ubuntu 22.04** (ou compatível)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) — Gerenciador de pacotes
- [Git](https://git-scm.com/)
- Banco de dados (ex: **MongoDB**)

---

## ⚙️ Instalação Geral

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/seu-usuario/CashTrack.git
cd readmin

instalar dependencias 

pnpm i

Crie o arquivo .env com base no exemplo:

MONGODB_URI=mongodb://localhost:27017
MONGO_DBNAME=cashtrack
SERVER_PORT=4000
GMAIL_USER=teste@gmail.com
GMAIL_APP_PASSWORD=senha_fake
NODE_ENV=development
JWT_SECRET=teste123


