function gerarNumero() {
    const numeroAleatorio = Math.floor(Math.random() * 75) + 1; // Gera número entre 1 e 75
    const numeroElement = document.getElementById('number');
    numeroElement.textContent = numeroAleatorio;
}