let numerosArray = [];  // Array para armazenar os números sorteados
let cartela = [];       // Array para armazenar a cartela de bingo
let cartelaHTML = document.getElementById('bingo-cartela');  // Elemento para exibir a cartela
let numeroElement = document.getElementById('number');  // Elemento para exibir o número sorteado

// Função para gerar a cartela de 15 linhas e 5 colunas
function gerarCartela() {
    const colunas = { B: [], I: [], N: [], G: [], O: [] };

    // Preenche as colunas com números únicos
    for (let i = 1; i <= 75; i++) {
        if (i <= 15) colunas.B.push(i);
        else if (i <= 30) colunas.I.push(i);
        else if (i <= 45) colunas.N.push(i);
        else if (i <= 60) colunas.G.push(i);
        else colunas.O.push(i);
    }

    // Embaralha as colunas
    colunas.B = embaralhar(colunas.B);
    colunas.I = embaralhar(colunas.I);
    colunas.N = embaralhar(colunas.N);
    colunas.G = embaralhar(colunas.G);
    colunas.O = embaralhar(colunas.O);

    // Preenche a cartela com 15 linhas (uma por número)
    for (let i = 0; i < 15; i++) {
        cartela.push([colunas.B[i], colunas.I[i], colunas.N[i], colunas.G[i], colunas.O[i]]);
    }

    // Renderiza a cartela no HTML
    renderizarCartela();
}

// Função para embaralhar os números dentro das colunas
function embaralhar(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Função para renderizar a cartela no HTML
function renderizarCartela() {
    cartelaHTML.innerHTML = '';  // Limpa o conteúdo anterior

    // Adiciona as células da cartela
    cartela.forEach((linha, i) => {
        const linhaDiv = document.createElement('div');
        linha.forEach((numero, j) => {
            const cell = document.createElement('div');
            cell.classList.add('bingo-celula');
            cell.id = `cell-${i}-${j}`;  // Cada célula terá um ID único
            cell.textContent = numero;
            cell.onclick = () => marcarNumero(i, j, numero);  // Marca o número quando a célula é clicada
            linhaDiv.appendChild(cell);
        });
        cartelaHTML.appendChild(linhaDiv);
    });
}

// Função para gerar um número aleatório e exibir na tela
function gerarNumero() {
    let numeroAleatorio;

    // Gera um número aleatório até que ele não tenha sido sorteado ainda
    do {
        numeroAleatorio = Math.floor(Math.random() * 75) + 1;
    } while (numerosArray.includes(numeroAleatorio));

    numeroElement.textContent = numeroAleatorio;  // Exibe o número sorteado
    numerosArray.push(numeroAleatorio);  // Adiciona à lista de números sorteados

    // Verifica se o número sorteado está na cartela e marca
    verificarEMarcarNumero(numeroAleatorio);
}

// Função para marcar o número sorteado na cartela
function verificarEMarcarNumero(numeroAleatorio) {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 5; j++) {
            if (cartela[i][j] === numeroAleatorio) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                cell.classList.add('marcado');  // Marca a célula
            }
        }
    }
}

// Função para marcar o número ao clicar na célula
function marcarNumero(i, j, numero) {
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (!cell.classList.contains('marcado')) {
        cell.classList.add('marcado');  // Marca a célula
    }
}

// Inicializa a cartela
gerarCartela();