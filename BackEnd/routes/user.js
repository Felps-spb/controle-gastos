const express = require('express');
const router = express.Router();


const Pessoa = require('../models/pessoa');
const Transacao = require('../models/transacao');

router.get('/cadastrar', async (req, res) => {
    try {
        Pessoa.find().lean().then((pessoas) => {
            res.render('pessoa/cadastrar', { pessoas });
        })
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/cadastrarPessoa', async (req, res) => {
    try {
        res.render('pessoa/cadastrarPessoa');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/cadastrarPessoa/nova', async (req, res) => {

    const dataNascimento = new Date(req.body.dataNascimento);
    const idade = calcularIdade(dataNascimento);

    try {
        console.log(req.body)
        const cadastrarPessoa = {
            nome: req.body.nome,
            dataNascimento: dataNascimento,
            idade: idade
        };

        const novaPessoa = new Pessoa(cadastrarPessoa);
        await novaPessoa.save();
        req.flash("success_msg", "Pessoa cadastrada com sucesso");
        res.redirect('/pessoa/cadastrar');
    } catch (error) {
        console.error('Error:', error);
        req.flash("error_msg", "Erro ao cadastrar a pessoa");
        res.redirect('/pessoa/cadastrar');
    }
});

router.post('/cadastrar/deletar', async (req, res) => {
    try {

        await Pessoa.deleteOne({ _id: req.body.id });

        await Transacao.deleteMany({ PessoaId: req.body.id });

        req.flash("success_msg", "Pessoa e suas transações deletadas com sucesso!");
        res.redirect("/pessoa/cadastrar");
    } catch (err) {
        console.error(err);
        req.flash("error_msg", "Houve um erro ao deletar a Pessoa e suas transações, tente novamente!");
        res.redirect("/pessoa/cadastrar");
    }
});

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade;
}

module.exports = router;