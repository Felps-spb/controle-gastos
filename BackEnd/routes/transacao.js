const express = require('express');
const router = express.Router();


const Transacao = require('../models/transacao');
const Pessoa = require('../models/pessoa')

router.get('/cadastrar', async (req, res) => {
    try {
        Transacao.find().lean().populate('PessoaId').then((transacaos) => {
            res.render('transacao/cadastrar', { transacaos });
        })
    } catch (err) {
        console.error('Error rendering the Transacao page:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/cadastrarTransacao', async (req, res) => {
    try {
        const pessoas = await Pessoa.find().lean();
        res.render('transacao/cadastrarTransacao', { pessoas });
    } catch (err) {
        console.error('Error rendering the registration page:', err);
        res.status(500).send('Internal Server Error');
    }
});

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
        req.flash("success_msg", "Transacao cadastrada com sucesso");
        res.redirect('/transacao/cadastrar');
    } catch (error) {
        console.error('Error:', error);
        req.flash("error_msg", "Erro ao cadastrar a transacao");
        res.redirect('/transacao/cadastrar');
    }
})

router.post('/cadastrar/deletar', (req, res) => {
    Transacao.deleteOne({ _id: req.body.id }).then(() => {
        req.flash("success_msg", "Transacao deletada com sucesso!");
        res.redirect("/transacao/cadastrar");
    }).catch((err) => {
        console.error(err);
        req.flash("error_msg", "Houve um erro ao deletar a Transacao, tente novamente!");
        res.redirect("/transacao/cadastrar");
    });
});

module.exports = router;