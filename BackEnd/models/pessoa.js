
//requisicao do mongoose para o MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//criacao do Schema do modelo Pessoa para o MongoDB

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
// Evita sobrescrever modelos ja existentes
mongoose.models = {};

// Cria o modelo Pessoa com base no schema
const Pessoa = mongoose.model('Pessoa', PessoaSchema);

// Exporta o modelo para uso em outras partes da aplicacao
module.exports = Pessoa;