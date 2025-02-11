//importacao e configuracoes iniciais

const express = require('express');
const router = express.Router();

const Pessoa = require('../models/pessoa');
const Transacao = require('../models/transacao');


//  Rota para listar pessoas cadastradas: 
//  Esta rota busca todas as pessoas no banco de dados e renderiza a view
//  "pessoa/cadastrar" com a lista de pessoas
router.get('/cadastrar', async (req, res) => {
    try {
        Pessoa.find().lean().then((pessoas) => {
            res.render('pessoa/cadastrar', { pessoas });
        })
    } catch (err) {
        console.error('Erro ao renderizar pagina de listagem de pessoas cadastradas', err);
        res.status(500).send('Internal Server Error');
    }
});

//  Rota para exibir o form de cadastro de pessoas:
//  Esta rota renderiza a view "pessoa/cadastrarPessoa", que contem um
//  formo para cadastrar uma nova pessoa.
router.get('/cadastrarPessoa', async (req, res) => {
    try {
        res.render('pessoa/cadastrarPessoa');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

//  Rota para cadastrar uma nova pessoa:
//  Esta rota recebe os dados de uma nova pessoa via req.body,
//  calcula a idade com base na data de nascimento e salva a pessoa no banco de dados.
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

//  Rota para deletar uma pessoa e suas transacoes:
//  Esta rota deleta uma pessoa com base no id recebido via req.body e
//  deleta todas as transacoes associadas a essa pessoa.
router.post('/cadastrar/deletar', async (req, res) => {
    try {

        await Pessoa.deleteOne({ _id: req.body.id });

        await Transacao.deleteMany({ PessoaId: req.body.id }); //Metodo do mongoose para deletar varios documentos

        req.flash("success_msg", "Pessoa e suas transações deletadas com sucesso!");
        res.redirect("/pessoa/cadastrar");
    } catch (err) {
        console.error(err);
        req.flash("error_msg", "Houve um erro ao deletar a Pessoa e suas transações, tente novamente!");
        res.redirect("/pessoa/cadastrar");
    }
});

//  funcao para calcular a idade do usuario:
//  funcao feita com base no recebimento da data de nascimento do usuario
//  essa funcao foi realizada para a atualizacao dinamica de idade do user
//  e feito para comparar na limitacao do caso do usuario ser < de 18 anos.
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