const { readFile } = require('fs');

const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo() {
        // console.log('this.NOME_ARQUIVO: ', this.NOME_ARQUIVO);
        // console.log('this.NOME_ARQUIVO2: ', await readFileAsync(this.NOME_ARQUIVO));
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');

        // console.log('arquivo: ', arquivo);
        // console.log('arquivo: JSON.parse', JSON.parse(arquivo));
        // console.log('arquivo: .toString()', arquivo.toString());
        return JSON.parse(arquivo.toString());
    }

    escreverArquivo() {}

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));
        return dadosFiltrados;
    }
}

module.exports = new Database();
