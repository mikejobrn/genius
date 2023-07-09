import { Cor } from './cor.mjs'

const AZUL = new Cor('azul')
const AMARELO = new Cor('amarelo')
const VERMELHO = new Cor('vermelho')
const VERDE = new Cor('verde')

const cores = new Map()
cores.set(1, AZUL)
cores.set(2, AMARELO)
cores.set(3, VERMELHO)
cores.set(4, VERDE)
cores.set('azul', AZUL)
cores.set('amarelo', AMARELO)
cores.set('vermelho', VERMELHO)
cores.set('verde', VERDE)

let sequenciaCores = []
let sequenciaJogadas = []
let fimJogo = false
let pontuacaoMaxima = 0
let pontuacaoAtual = 0
let pontuacaoUltimaEtapa = 0

document.getElementById('start').addEventListener('click', iniciarJogo)

async function iniciarJogo() {
    resetarJogo()
    await iniciarSequencia()
}

function resetarJogo() {
    sequenciaCores = []
    sequenciaJogadas = []
    fimJogo = false
    ocultarResultado()
}

function ocultarResultado() {
    const resultadoDom = document.getElementById('resultado')
    resultadoDom.classList.add('invisible')
}

async function iniciarSequencia() {
    bloquearInputs()
    sortearNovaCor()
    await reproduzirSequencia()
    liberarInputs()
}

function sortearNovaCor() {
    sequenciaCores.push(cores.get(sortearNumero()))
}

function sortearNumero() {
    return Math.floor(Math.random() * 4) + 1
}

async function reproduzirSequencia() {
    for (const cor of sequenciaCores) {        
        await cor.play()
        await new Promise(resolve => setTimeout(resolve, 200))
    }
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
    const corSelecionada = obtemCorSelecionada(e.target.id)
    corSelecionada.play()
    adicionaCorAJogada(corSelecionada)
    checarJogada()
}

function obtemCorSelecionada(id) {
    return cores.get(e.target.id)
}

function adicionaCorAJogada(cor) {
    sequenciaJogadas.push(corSelecionada)
}

function checarJogada() {
    for (let i = 0; i < sequenciaCores.length; i++) {
        const errouJogada = sequenciaCores[i] !== sequenciaJogadas[i] && i < sequenciaJogadas.length
        if (errouJogada) {
            fimJogo = true
            atualizarPontuacao()
            if (pontuacaoAtual > pontuacaoMaxima) {
                atualizarPontuacaoMaxima()
            }
            return exibirPlacar()
        }
    }

    const acabouRodada = !fimJogo && sequenciaCores.length === sequenciaJogadas.length
    if (acabouRodada) {
        pontuacaoUltimaEtapa = sequenciaJogadas.length
        sequenciaJogadas = []
        setTimeout(iniciarSequencia, 1000)
    }
}

function atualizarPontuacao() {
    pontuacaoAtual = pontuacaoUltimaEtapa
    document.getElementById('pontuacao').value = pontuacaoAtual
}

function atualizarPontuacaoMaxima() {
    pontuacaoMaxima = pontuacaoAtual
    document.getElementById('pontuacao-maxima').value = pontuacaoMaxima
}

function exibirPlacar() {
    document.getElementById('pontuacao').innerText = pontuacaoAtual
    document.getElementById('pontuacao-maxima').innerText = pontuacaoMaxima
    document.getElementById('resultado').classList.remove('invisible')
}