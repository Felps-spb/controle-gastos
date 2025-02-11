const flash = require('connect-flash')
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose')
const app = express();
const port = 8080

const Pessoa = require('./BackEnd/models/pessoa');
const Transacao = require('./BackEnd/models/transacao');

//mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ControleDeGastos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao MongoDB...");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
    process.exit(1);
});

//session
app.use(session({
    secret: 'meuSite',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

//middleware
app.use(flash());
app.use(express.urlencoded({ extended: true }));

//flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//handlebars
const expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'frontend/views'));

//public
app.use(express.static(path.join(__dirname, 'frontEnd/public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get('/', async (req, res) => {
    try {
        // Buscar todas as pessoas
        const pessoas = await Pessoa.find().lean();

        // Para cada pessoa, calcular receitas, despesas e saldo
        const pessoasComTransacoes = await Promise.all(pessoas.map(async (pessoa) => {
            const transacoes = await Transacao.find({ PessoaId: pessoa._id }).lean();
            const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
            const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
            const saldo = receitas - despesas;

            return {
                ...pessoa,
                receitas,
                despesas,
                saldo
            };
        }));

        // Renderizar a view com os dados processados
        res.render('index', { pessoas: pessoasComTransacoes });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});


const usuarioRoutes = require('./BackEnd/routes/user');
app.use('/pessoa', usuarioRoutes);

const transacaoRoutes = require('./BackEnd/routes/transacao');
app.use('/transacao', transacaoRoutes)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});