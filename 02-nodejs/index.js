// 0 Obter um usuario
// 1 Obter o numero de telefone de um usuario a partir de seu id
// 2 Obter o endereço de usuario pelo id
// importamos um módulo interno do nodejs

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    // quando der algum problema => reject(erro)
    //quando sucess => resolve(resultado)
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '11999999999',
                ddd: 11,
            });
        }, 2000);
    });
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0,
        });
    }, 2000);
}

//1 passo adicionar a palavra async na função => automaticamente retornará uma promise
main();
async function main() {
    try {
        console.time('medida-promise');

        const usuario = await obterUsuario();
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id),
        ]);
        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone},
        Endereço: ${endereco.rua}, ${endereco.numero}`);

        console.timeEnd('medida-promise');
    } catch (error) {
        console.log('error', error);
    }
}

//promise
// const usuarioPromise = obterUsuario();
// //para manipular o sucesso usamos a função .then
// //para manipular o erro usamos a função .catch
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id).then(function resolverTelefone(telefone) {
//             return {
//                 usuario: {
//                     nome: usuario.nome,
//                     id: usuario.id,
//                 },
//                 telefone: telefone,
//             };
//         });
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id);
//         return endereco.then(function resolverEndereco(endereco) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: endereco,
//             };
//         });
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}`);
//     })
//     .catch(function (error) {
//         console.log('error usuarioPromise', error);
//     });

//callback
// obterUsuario(function resolverUsuario(error, usuario) {
//     if (error) {
//         console.log('erro usuario', error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.log('erro telefone', error1);
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.log('erro endereco', error2);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereço: ${endereco.rua}, ${endereco.numero}
//                 Telefone: (${telefone.ddd}) ${telefone.numero}
//             `);
//         });
//     });
// });
