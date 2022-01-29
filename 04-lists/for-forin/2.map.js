const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];

    for (let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
};

async function main() {
    try {
        const results = await service.obterPessoas('a');

        // console.time('foreach');
        // const names1 = [];
        // results.results.forEach((item) => {
        //     names1.push(item.name);
        // });
        // console.timeEnd('foreach');

        // console.time('map');
        // const names = results.results.map((pessoa) => pessoa.name);
        // console.timeEnd('map');

        const names = results.results.meuMap((pessoa, indice) => `${indice}: ${pessoa.name}`);
        console.log('names', names);
    } catch (error) {
        console.log('error', error);
    }
}

main();
