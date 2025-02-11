// Importação de modulos necessarios
const flash = require('connect-flash'); // Para mensagens flash (ex: mensagens de sucesso/erro)
const express = require('express'); // Framework para criar o servidor
const session = require('express-session'); // Para gerenciar sessões de usuario
const path = require('path'); // Para manipular caminhos de arquivos e diretorios
const mongoose = require('mongoose'); // Para conectar e interagir com o MongoDB
const app = express(); // Cria uma instancia do Express

// Configuracao do Mongoose (conexao com o MongoDB)
mongoose.Promise = global.Promise; // Usa Promises nativas do Node.js
mongoose.connect('mongodb://localhost/ControleDeGastos', {
    useNewUrlParser: true, // Evita warnings de depreciacao
    useUnifiedTopology: true // Usa o novo motor de descoberta de servidores
}).then(() => {
    console.log("Conectado ao MongoDB...");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
    process.exit(1);
});

// Configuracao da sessao
app.use(session({
    secret: 'meuSite', // Chave secreta para assinar o cookie da sessao
    resave: false, // Evita regravar a sessao se nao houver mudancas
    saveUninitialized: false, // Evita salvar sessoes nao inicializadas
    cookie: { secure: true } // Cookie seguro (recomendado para HTTPS)
}));

// Middleware para processar dados de formularios
app.use(express.urlencoded({ extended: true })); // Permite o parsing de dados URL-encoded

// Configuracao do connect-flash para mensagens flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // Mensagens de sucesso
    res.locals.error_msg = req.flash('error_msg'); // Mensagens de erro
    res.locals.error = req.flash('error'); // Erros gerais
    next(); // Passa o controle para o proximo middleware
});

// Configuracao do Handlebars como engine de templates
const expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars.engine()); // Define Handlebars como engine
app.set('view engine', 'handlebars'); // Define a engine de visualizacao
app.set('views', path.join(__dirname, 'frontend/views')); // Define o diretorio de views

// Configuracao de arquivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estaticos da pasta 'public'
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))); // Serve arquivos do Bootstrap

// Importacao das rotas
const usuarioRoutes = require('./BackEnd/routes/user'); // Rotas relacionadas a usuarios
app.use('/pessoa', usuarioRoutes); // Define o prefixo '/pessoa' para as rotas de usuario

const transacaoRoutes = require('./BackEnd/routes/transacao'); // Rotas relacionadas a transacoes
app.use('/transacao', transacaoRoutes); // Define o prefixo '/transacao' para as rotas de transacao

// Importacao do controlador do dashboard
const dashboardController = require('./BackEnd/controllers/dashboardController');

// Rota principal (dashboard)
app.get('/', dashboardController.getDashboard); // Rota para a pagina inicial

// Configuracao da porta do servidor
const port = process.env.port || 8090; // Usa a porta definida no ambiente ou 8090 por padrao
app.listen(port, () => {
    console.log(`http://localhost:${port}`); // Inicia o servidor e exibe a URL
});