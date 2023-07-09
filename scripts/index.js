import { Partida } from './partida.mjs'

let partida
let pontuacaoMaxima = 0

document.getElementById('start').addEventListener('click', iniciarJogo)

async function iniciarJogo() {
    resetarJogo()
    await iniciarSequencia()
}

function resetarJogo() {
    partida = new Partida()
    ocultarResultado()
    partida.testaVerificacaoErros()
}

function ocultarResultado() {
    const resultadoDom = document.getElementById('resultado')
    resultadoDom.classList.add('invisible')
}

async function iniciarSequencia() {
    bloquearInputs()
    partida.sortearNovaCor()
    await partida.reproduzirSequencia()
    liberarInputs()
}

function bloquearInputs() {
    const coresDom = document.getElementsByClassName('cor')
    for (const corDom of coresDom) {
        corDom.removeEventListener('click', acionaCor)
    }
}

function liberarInputs() {
    const coresDom = document.getElementsByClassName('cor')
    for (const corDom of coresDom) {
        corDom.addEventListener('click', acionaCor)
    }
}

function acionaCor(e) {
    e.preventDefault()
    partida.acionarCor(e.target.id)
    checarJogada()
}

function checarJogada() {
    const acabouPartida = partida.temJogadaErrada()
    if (acabouPartida) {
        if (partida.pontuacaoAtual > pontuacaoMaxima) {
            atualizarPontuacaoMaxima()
        }
        return exibirPlacar()
    }

    if (partida.acabouRodada()) {
        partida.iniciarNovaRodada()
        setTimeout(iniciarSequencia, 1000)
    }
}

function atualizarPontuacaoMaxima() {
    pontuacaoMaxima = partida.pontuacaoAtual
}

function exibirPlacar() {
    document.getElementById('pontuacao').innerText = partida.pontuacaoAtual
    document.getElementById('pontuacao-maxima').innerText = pontuacaoMaxima
    document.getElementById('resultado').classList.remove('invisible')
}