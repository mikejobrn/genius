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

const sorteiaCor = () => Math.floor(Math.random() * 4) + 1

let sequenciaCores = []
let sequenciaJogadas = []
let fimJogo = false
let pontuacaoMaxima = 0
let pontuacaoAtual = 0
let pontuacaoUltimaEtapa = 0

async function iniciarJogo() {
    sequenciaCores = []
    sequenciaJogadas = []
    fimJogo = false
    const resultadoDom = document.getElementById('resultado')
    resultadoDom.classList.add('invisible')
    await iniciarSequencia()
}

async function iniciarSequencia() {
    bloqueiaInputs()
    sequenciaCores.push(cores.get(sorteiaCor()))
    for (const cor of sequenciaCores) {        
        await cor.play()
        await new Promise(resolve => setTimeout(resolve, 200))
    }
    liberaInputs()
}

document.getElementById('start').addEventListener('click', iniciarJogo)

function bloqueiaInputs() {
    const coresDom = document.getElementsByClassName('cor')
    for (const corDom of coresDom) {
        corDom.removeEventListener('click', acionaCor)
    }
}

function liberaInputs() {
    const coresDom = document.getElementsByClassName('cor')
    for (const corDom of coresDom) {
        corDom.addEventListener('click', acionaCor)
    }
}

function acionaCor(e) {
    e.preventDefault()
    const corSelecionada = cores.get(e.target.id)
    corSelecionada.play()
    sequenciaJogadas.push(corSelecionada)
    checarJogada()
}

function checarJogada() {
    for (let i = 0; i < sequenciaCores.length; i++) {
        if (sequenciaJogadas.length <= sequenciaCores.length && sequenciaJogadas[i] !== undefined && sequenciaCores[i] !== sequenciaJogadas[i]) {
            fimJogo = true
            pontuacaoAtual = pontuacaoUltimaEtapa
            atualizarPontuacao()
            if (pontuacaoAtual > pontuacaoMaxima) {
                pontuacaoMaxima = pontuacaoAtual
                atualizarPontuacaoMaxima()
            }
            break
        }
    }

    if (!fimJogo && sequenciaCores.length === sequenciaJogadas.length) {
        pontuacaoUltimaEtapa = sequenciaJogadas.length
        sequenciaJogadas = []
        setTimeout(iniciarSequencia, 1000)
    } 
    else if (fimJogo) {
        document.getElementById('pontuacao').innerText = pontuacaoAtual
        document.getElementById('pontuacao-maxima').innerText = pontuacaoMaxima
        document.getElementById('resultado').classList.remove('invisible')
    }

}

function atualizarPontuacao() {
    document.getElementById('pontuacao').value = pontuacaoAtual
}

function atualizarPontuacaoMaxima() {
    document.getElementById('pontuacao-maxima').value = pontuacaoMaxima
}