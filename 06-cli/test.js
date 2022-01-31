const { deepEqual, ok } = require('assert');

const Database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1,
};

describe('Suite de manipulação de Herois', () => {
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await Database.listar(expected.id);
        console.log('expected: ', expected);
        console.log('resultado: ', resultado);

        ok(resultado, expected);
    });
    // it('deve cadastrar um heroi, usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR;

    //     ok(null, expected);
    // });
});
