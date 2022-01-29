// 0 Obter um usuario
// 1 Obter o numero de telefone de um usuario a partir de seu id
// 2 Obter o endereço de usuario pelo id

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
        });
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            ddd: 11,
            numero: '123456789',
        });
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0,
        });
    }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
    if (error) {
        console.log('erro usuario', error);
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error1) {
            console.log('erro telefone', error1);
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.log('erro endereco', error2);
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereço: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.numero}
            `);
        });
    });
});
