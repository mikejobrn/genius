/**
 * Retorna um número aleatório entre `minimo` e `maximo`
 */
export function sortearNumero(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}