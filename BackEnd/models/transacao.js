
//requisicao do mongoose para o MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//criacao do Schema de Transacao para o MongoDB

const TransacaoSchema = new Schema({
    Descricao: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    PessoaId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa',
    }
});

// Evita sobrescrever modelos ja existentes
mongoose.models = {};

// Cria o modelo Transacao com base no schema
const Transacao = mongoose.model('transacao', TransacaoSchema);

//Exporta o modelo para uso em outras partes da aplicacao
module.exports = Transacao;