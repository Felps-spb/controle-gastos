const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

mongoose.models = {};
const Transacao = mongoose.model('transacao', TransacaoSchema);

module.exports = Transacao;