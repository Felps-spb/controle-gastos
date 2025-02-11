const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    idade: {
        type: Number,
        require: true
    }
});

mongoose.models = {};
const Pessoa = mongoose.model('Pessoa', PessoaSchema);

module.exports = Pessoa;