
//recebendo os models para requisicao das informacoes
const Pessoa = require('../models/pessoa');
const Transacao = require('../models/transacao');

//export da funcao para formatar os valores antes de enviar para o template.

exports.getDashboard = async (req, res) => {
    try {
        // Buscar todas as pessoas
        const pessoas = await Pessoa.find().lean();
        console.log('Pessoas encontradas:', pessoas);

        // Para cada pessoa, calcular receitas, despesas e saldo
        const pessoasComTransacoes = await Promise.all(pessoas.map(async (pessoa) => {
            const transacoes = await Transacao.find({ PessoaId: pessoa._id }).lean();
            console.log(`Transações para ${pessoa.nome}:`, transacoes);

            const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
            const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
            const saldo = receitas - despesas;

            console.log(`Receitas para ${pessoa.nome}:`, receitas);
            console.log(`Despesas para ${pessoa.nome}:`, despesas);
            console.log(`Saldo para ${pessoa.nome}:`, saldo);

            return {
                ...pessoa,
                receitas: receitas.toFixed(2), // Formatar no back-end
                despesas: despesas.toFixed(2), // Formatar no back-end
                saldo: saldo.toFixed(2) // Formatar no back-end
            };
        }));

        // Calcular totais gerais
        const receitasTotais = pessoasComTransacoes.reduce((acc, pessoa) => acc + parseFloat(pessoa.receitas), 0).toFixed(2);
        const despesasTotais = pessoasComTransacoes.reduce((acc, pessoa) => acc + parseFloat(pessoa.despesas), 0).toFixed(2);
        const saldoLiquido = (receitasTotais - despesasTotais).toFixed(2);

        //exibe no console os totais gerais
        console.log('Receitas totais:', receitasTotais);
        console.log('Despesas totais:', despesasTotais);
        console.log('Saldo líquido:', saldoLiquido);

        // Renderizar a view com os dados processados
        res.render('index', {
            pessoas: pessoasComTransacoes,
            receitasTotais,
            despesasTotais,
            saldoLiquido
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).send('Erro de server');
    }
};