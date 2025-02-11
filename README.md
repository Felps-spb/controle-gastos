# Sistema de Controle de Gastos

## Visão Geral
O Sistema de Controle de Gastos é uma aplicação web desenvolvida para gerenciar despesas e receitas de forma eficiente.
Ele permite que os usuários cadastrem transações financeiras, visualizem um dashboard com insights sobre seus gastos e receitas,
e gerenciem suas informações pessoais. A aplicação foi construída com foco em escalabilidade, segurança e usabilidade,
utilizando tecnologias modernas e boas práticas de desenvolvimento.

 ### Tecnologias Utilizadas:

> Backend:

- Node.js: Ambiente de execução JavaScript para construir a aplicação.

- Express.js: Framework para criação de APIs e rotas.
  
- Express-Session: Gerenciamento de sessões de usuário.

- Connect-Flash: Exibição de mensagens temporárias (flash messages) para feedback ao usuário.

- Mongoose: Biblioteca para conexão e interação com o banco de dados MongoDB.
  (necessario instalação do MONGODB na maquina)

#### Instalador do mongo
  ```
  https://www.mongodb.com/try/download/community
  ```
#### Terminal do mongo
  ```
  https://www.mongodb.com/try/download/shell
  ```

> Frontend:

- Handlebars: Engine de templates para renderização de páginas HTML.

- Bootstrap: Framework CSS para design responsivo e componentes pré-estilizados.

- Font Awesome: Biblioteca de ícones para melhorar a interface do usuário.

> Banco de Dados:

- MongoDB: Banco de dados NoSQL para armazenamento de dados flexível e escalável.

> Outras Ferramentas:

- NPM: Gerenciador de pacotes para instalação de dependências.

- Git: Controle de versão do código-fonte.

### Funcionalidades Principais

> Dashboard:

- Visualização resumida de gastos e receitas.

> Cadastro de Pessoas:

- Cadastro de usuários com nome, data de nascimento e idade.

- Exclusão de usuários cadastrados.

> Transações Financeiras:

- Cadastro de transações (despesas e receitas).

- Categorização de transações para melhor organização.

- Visualização de histórico de transações.

> Mensagens de Feedback:

- Mensagens de sucesso, erro e alerta exibidas ao usuário após ações críticas (ex: cadastro, exclusão).

> Sessão de Usuário:

- Gerenciamento de sessões para autenticação e personalização da experiência do usuário.

### Como Executar o Projeto:

> Pré-requisitos:

- Node.js (v16 ou superior) instalado.

- MongoDB instalado e rodando localmente ou em um servidor remoto.

- Git (opcional, para clonar o repositório).

> Passos para Execução:

Instale as Dependências:
```
 npm install
```
Configure o Banco de Dados:

-- Certifique-se de que o MongoDB está rodando.

-- Caso necessário, altere a string de conexão no arquivo principal (app.js) para apontar para o seu banco de dados.

> Inicie o Servidor:
```
npm start
```
Acesse a Aplicação:
```
Abra o navegador e acesse: http://localhost:8090.
```

Estrutura do Projeto
```
controle-de-gastos/
├── BackEnd/
│   ├── controllers/         # Controladores para lógica de negócio
│   ├── routes/              # Definição de rotas da aplicação
│   └── models/              # Modelos de dados para o MongoDB
├── frontend/
│   ├── views/               # Templates Handlebars
│   └── public/              # Arquivos estáticos (CSS, JS, imagens)
├── node_modules/            # Dependências do projeto
├── app.js                   # Ponto de entrada da aplicação
├── package.json             # Metadados e dependências do projeto
└── README.md                # Documentação do projeto
```
