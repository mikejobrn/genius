import { Cor } from './cor.mjs'
import { sortearNumero } from "./utils.mjs"

export class Partida {
    #sequenciaCores
    #sequenciaJogadas
    
    // TODO:
    #fimJogo

    #pontuacaoAtual
    get pontuacaoAtual() {
        return this.#pontuacaoAtual
    }

    // TODO:
    #cores

    constructor() {
        this.#sequenciaCores = []
        this.#sequenciaJogadas = []
        this.#fimJogo = false
        this.#pontuacaoAtual = 0

        const AZUL = new Cor('azul')
        const AMARELO = new Cor('amarelo')
        const VERMELHO = new Cor('vermelho')
        const VERDE = new Cor('verde')

        this.#cores = new Map([
            [1, AZUL],
            [2, AMARELO],
            [3, VERMELHO],
            [4, VERDE],
            ['azul', AZUL],
            ['amarelo', AMARELO],
            ['vermelho', VERMELHO],
            ['verde', VERDE]
        ])
    }

    sortearNovaCor() {
        this.#sequenciaCores.push(this.#cores.get(sortearNumero(1, 4)))
    }

    async reproduzirSequencia() {
        for (const cor of this.#sequenciaCores) {        
            await cor.play()
            await new Promise(resolve => setTimeout(resolve, 200))
        }
    }

    acionarCor(id) {
        const corSelecionada = this.#obtemCorPorId(id)
        corSelecionada.play()
        this.#adicionaCorAJogada(corSelecionada)
    }

    #obtemCorPorId(id) {
        return this.#cores.get(id)
    }

    #adicionaCorAJogada(cor) {
        this.#sequenciaJogadas.push(cor)
        if (!this.temJogadaErrada()) {
            this.#atualizarPontuacao()
        }
    }

    testaVerificacaoErros() {
        const sequenciaCoresBkp = [...this.#sequenciaCores]
        const sequenciaJogadasBkp = [...this.#sequenciaJogadas]

        const AZUL = new Cor('azul')
        const AMARELO = new Cor('amarelo')
        const VERMELHO = new Cor('vermelho')
        const VERDE = new Cor('verde')

        this.#sequenciaCores = [AZUL]
        this.#sequenciaJogadas = [AZUL]
        console.assert(!this.temJogadaErrada(), 1)

        this.#sequenciaCores = [AZUL]
        this.#sequenciaJogadas = [VERDE]
        console.assert(this.temJogadaErrada(), 2)

        this.#sequenciaCores = [AZUL, VERDE]
        this.#sequenciaJogadas = [AZUL]
        console.assert(!this.temJogadaErrada(), 3)

        this.#sequenciaCores = [AZUL, VERDE]
        this.#sequenciaJogadas = [AZUL, VERDE]
        console.assert(!this.temJogadaErrada(), 4)

        this.#sequenciaCores = [AZUL, VERDE]
        this.#sequenciaJogadas = [VERDE]
        console.assert(this.temJogadaErrada(), 5)

        this.#sequenciaCores = [AZUL, VERDE]
        this.#sequenciaJogadas = [AZUL, AZUL]
        console.assert(this.temJogadaErrada(), 6)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [AZUL]
        console.assert(!this.temJogadaErrada(), 7)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [VERDE]
        console.assert(this.temJogadaErrada(), 8)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [AZUL, VERDE]
        console.assert(!this.temJogadaErrada(), 9)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [AZUL, AMARELO]
        console.assert(this.temJogadaErrada(), 10)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [AZUL, VERDE, AMARELO]
        console.assert(!this.temJogadaErrada(), 11)

        this.#sequenciaCores = [AZUL, VERDE, AMARELO]
        this.#sequenciaJogadas = [AZUL, VERDE, VERMELHO]
        console.assert(this.temJogadaErrada(), 12)

        this.#sequenciaCores = sequenciaCoresBkp
        this.#sequenciaJogadas = sequenciaJogadasBkp
        this.#fimJogo = false
    }

    temJogadaErrada() {
        for (let i = 0; i < this.#sequenciaCores.length && i < this.#sequenciaJogadas.length; i++) {
            const jogadaDiferente = this.#sequenciaCores[i] !== this.#sequenciaJogadas[i]
            if (jogadaDiferente) {
                this.#fimJogo = true
                return true
            }
        }

        return false
    }

    #atualizarPontuacao() {
        this.#pontuacaoAtual = this.#sequenciaCores.length
    }

    acabouRodada() {
        return !this.#fimJogo && this.#sequenciaCores.length === this.#sequenciaJogadas.length
    }

    iniciarNovaRodada() {
        this.#sequenciaJogadas = []
    }

}