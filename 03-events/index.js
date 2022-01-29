const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';

meuEmissor.on(nomeEvento, function (click) {
    console.log('usuario clicou', click);
});

const stdin = process.openStdin();

stdin.addListener('data', function (value) {
    console.log(`O valor digitado foi ${value.toString().trim()}`);
});

//promise vai ser executada sempre uma única vez

// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
// meuEmissor.emit(nomeEvento, 'no ok');

// let count = 0;
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok' + count++);
// }, 1000);
