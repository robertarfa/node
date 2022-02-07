const Commander = require('commander');
const Database = require('./dataBase');
const Heroi = require('./heroi');

async function main() {
    Commander.version('v1')
        .option('-n, --nome [value]', 'Nome do heroi')
        .option('-p, --poder [value]', 'Poder do heroi')
        .option('-i, --id [value]', 'Informe o id do heroi')
        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover', 'Remover um heroi')
        .option('-a, --atualizar [value]', 'Atualizar um heroi')
        .parse(process.argv);

    const heroi = new Heroi(Commander);

    try {
        if (Commander.cadastrar) {
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);

            if (!resultado) {
                console.error('Heroi não foi cadastrado');
                return;
            }
            console.log('Heroi cadastrado com sucesso');
        }

        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id);

            if (!resultado) {
                console.error('Não foi possível remover o herói');
                return;
            }

            console.log('Heroi removido com sucesso');
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);

            //remover todas as chaves que estiverem com undefined ou null

            const dado = JSON.parse(JSON.stringify(heroi));
            const resultado = await Database.atualizar(idParaAtualizar, dado);

            if (!resultado) {
                console.error('Não foi possível atualizar o herói');
                return;
            }
            console.log('Heroi atualizado com sucesso');
        }
    } catch (error) {
        console.error('Erro: ', error);
    }
}

main();
