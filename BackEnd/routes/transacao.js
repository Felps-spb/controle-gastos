
//  importacao e configuracoes iniciais

const express = require('express');
const router = express.Router();

const Transacao = require('../models/transacao');
const Pessoa = require('../models/pessoa')

//  Rota para lista de transacoes: 
//  Essa rota busca as transacoes no banco de dados, popula o campo PessoaId com
//  os dados de pessoa associada e renderiza a view "transacao/cadastrar" com as transacoes
router.get('/cadastrar', async (req, res) => {
    try {
        const transacaos = await Transacao.find().lean().populate('PessoaId');
        res.render('transacao/cadastrar', { transacaos });
    } catch (err) {
        console.error('Erro ao renderizar pagina de listagem de Transacoes:', err);
        res.status(500).send('Internal Server Error');
    }
});

//  Rota para exibir o formulario de cadastro de transacao:
//  Esta rota busca todas as pessoas no banco de dados e renderiza a view
//  "transacao/cadastrarTransacao" com a lista de pessoas, que pode ser usada para selecionar a pessoa associada a transacao.
router.get('/cadastrarTransacao', async (req, res) => {
    try {
        const pessoas = await Pessoa.find().lean();
        res.render('transacao/cadastrarTransacao', { pessoas });
    } catch (err) {
        console.error('Erro ao renderizar pagina de cadastrar Transacao:', err);
        res.status(500).send('Internal Server Error');
    }
});

//  Rota para cadastrar uma nova transacao:
//  Esta rota recebe os dados de uma nova transacao via ```req.body```,
//  cria uma nova instancia de Transacao e a salva no banco de dados.
router.post('/cadastrarTransacao/nova', async (req, res) => {
    try {
        console.log(req.body)
        const cadastrarTransacao = {
            Descricao: req.body.descricao,
            valor: req.body.valor,
            tipo: req.body.tipo,
            PessoaId: req.body.pessoa
        }

        const novaTransacao = new Transacao(cadastrarTransacao);
        await novaTransacao.save();
        //  req.flash foi utilizado para enviar uma mensagem de sucesso ou erro
        req.flash("success_msg", "Transacao cadastrada com sucesso");
        //  redireciona o usuario de volta a pagina de listagem de transacoes
        res.redirect('/transacao/cadastrar');
    } catch (error) {
        console.error('Error:', error);
        req.flash("error_msg", "Erro ao cadastrar a transacao");
        res.redirect('/transacao/cadastrar');
    }
})

//  Rota para deletar uma transacao:
//  Esta rota deleta uma transacao com base no id recebido via ```req.body```.
router.post('/cadastrar/deletar', async (req, res) => {
    try {
        await Transacao.deleteOne({ _id: req.body.id }); // o deleteOne eh um metodo do mongoose para deletar o documento no banco de dados (MongoDB)
        req.flash("success_msg", "Transacao deletada com sucesso!"); // req.flash foi utilizado para enviar uma mensagem de sucesso ou erro
        res.redirect("/transacao/cadastrar");// redireciona o usuario de volta a pagina de listagem de transacoes
    } catch (err) {
        console.error(err);
        req.flash("error_msg", "Houve um erro ao deletar a Transacao, tente novamente!");
        res.redirect("/transacao/cadastrar");
    }
});

//  exportacao do roteador
module.exports = router;