export class Cor {
    #nome
    get nome() {
        return this.#nome
    }

    #som
    get som() {
        return this.#som
    }

    constructor(nome, som) {
        this.#nome = nome
        this.#som = som
    }

    async play() {
        const corDom = document.getElementById(this.#nome)
        corDom.classList.add('aceso')
        await new Promise(resolve => setTimeout(resolve, 500))
        corDom.classList.remove('aceso')
    }
}