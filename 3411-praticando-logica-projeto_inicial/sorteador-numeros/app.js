let numerosDisponiveis = [];

function getInputValues() {
    return {
        quantidade: parseInt(document.getElementById('quantidade').value),
        de: parseInt(document.getElementById('de').value),
        ate: parseInt(document.getElementById('ate').value)
    };
}

function showMessage(msg) {
    alert(msg);
}

function initializeNumerosDisponiveis(de, ate) {
    numerosDisponiveis = [];
    for (let i = de; i <= ate; i++) {
        numerosDisponiveis.push(i);
    }
}

function renderResultado(numerosSorteados) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML += `<p><strong>Sorteio:</strong> ${numerosSorteados.join(', ')}</p>`;
    resultado.innerHTML += `<p><strong>Números restantes:</strong> ${numerosDisponiveis.length ? numerosDisponiveis.join(', ') : 'Nenhum, reinicie o sorteador.'}</p>`;
}

function sortear() {
    const { quantidade, de, ate } = getInputValues();

    if (isNaN(quantidade) || isNaN(de) || isNaN(ate)) {
        return showMessage('Por favor, preencha todos os campos!');
    }

    if (de >= ate) {
        return showMessage('O valor "Do número" deve ser menor que "Até o número".');
    }

    const totalNumerosPossiveis = ate - de + 1;

    if (quantidade > totalNumerosPossiveis) {
        return showMessage(`Quantidade de números maior do que o intervalo disponível! Máximo permitido: ${totalNumerosPossiveis}`);
    }

    // Inicializa o array de números disponíveis uma única vez
    if (numerosDisponiveis.length === 0) {
        initializeNumerosDisponiveis(de, ate);
        // Bloqueia as configurações durante a série de sorteios
        document.getElementById('de').disabled = true;
        document.getElementById('ate').disabled = true;
    }

    if (numerosDisponiveis.length < quantidade) {
        return showMessage("Todos os números foram sorteados ou o restante é menor que a quantidade solicitada. Reinicie o sorteador.");
    }

    const numerosSorteados = [];
    for (let i = 0; i < quantidade; i++) {
        const indice = Math.floor(Math.random() * numerosDisponiveis.length);
        const numero = numerosDisponiveis.splice(indice, 1)[0];
        numerosSorteados.push(numero);
    }

    renderResultado(numerosSorteados);

    if (numerosDisponiveis.length === 0) {
        document.getElementById('btn-sortear').disabled = true;
    }
}

function reiniciar() {
    numerosDisponiveis = [];
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>`;
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('btn-sortear').disabled = false;
    document.getElementById('de').disabled = false;
    document.getElementById('ate').disabled = false;
}
