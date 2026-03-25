const readline = require('readline');

// Configuramos la interfaz para leer la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Esta función nos permite pedir datos y esperar la respuesta (asincronía)
const preguntar = (texto) => new Promise(resolve => rl.question(texto, resolve));

async function juegoDeVelocidad() {
    const numeroMagico = Math.floor(Math.random() * 10) + 1;
    let juegoTerminado = false;

    console.log("--- ¡TIENES 5 SEGUNDOS PARA ADIVINAR EL NÚMERO (1-10)! ---");

    // 1. El Temporizador (Corre de fondo)
    const temporizador = async () => {
        await esperar(5000);
        if (!juegoTerminado) {
            console.log("\n\n¡TIEMPO AGOTADO! El número era: " + numeroMagico);
            rl.close();
            process.exit();
        }
    };

    temporizador();

    // 2. Bucle de intentos
    while (!juegoTerminado) {
        const respuesta = await preguntar("Tu intento: ");
        const intento = parseInt(respuesta);

        if (intento === numeroMagico) {
            juegoTerminado = true;
            console.log("¡FELICIDADES! Lo lograste a tiempo.");
            rl.close();
        } else {
            console.log("No... ¡sigue intentando!");
        }
    }
}

juegoDeVelocidad();