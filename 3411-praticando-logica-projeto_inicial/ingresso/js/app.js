// Inicializa as quantidades disponíveis
let disponiveis = {
    pista: 100,
    superior: 200,
    inferior: 400
};

// Função principal de compra
function comprar() {
    // Obtém os valores do formulário
    const tipoIngresso = document.getElementById('tipo-ingresso').value;
    const quantidadeInput = document.getElementById('qtd');
    const quantidade = parseInt(quantidadeInput.value);

    // Validações
    if (isNaN(quantidade) || quantidade < 1) {
        alert('Por favor, insira uma quantidade válida (mínimo 1).');
        return;
    }

    if (quantidade > 100) {
        alert('Você pode comprar no máximo 10 ingressos por vez.');
        return;
    }

    // Verifica disponibilidade
    if (disponiveis[tipoIngresso] < quantidade) {
        alert(`Desculpe, só temos ${disponiveis[tipoIngresso]} ingressos disponíveis para ${getNomeIngresso(tipoIngresso)}.`);
        return;
    }

    // Atualiza a quantidade disponível
    disponiveis[tipoIngresso] -= quantidade;
    atualizarQuantidadesDisponiveis();

    // Feedback para o usuário
    alert(`Compra realizada com sucesso! ${quantidade} ingresso(s) ${getNomeIngresso(tipoIngresso)}.`);

    // Limpa o campo de quantidade
    quantidadeInput.value = '';
}

// Atualiza as quantidades exibidas na página
// ... (código anterior permanece igual)

function atualizarQuantidadesDisponiveis() {
    for (const tipo in disponiveis) {
        const elemento = document.getElementById(`qtd-${tipo}`);
        if (disponiveis[tipo] > 0) {
            elemento.textContent = disponiveis[tipo];
            elemento.className = ''; // Remove todas as classes
        } else {
            elemento.textContent = 'Indisponível';
            elemento.className = 'indisponivel'; // Garante que só esta classe exista
            document.querySelector(`#tipo-ingresso option[value="${tipo}"]`).disabled = true;
        }
    }
}

// ... (restante do código permanece igual)

// Helper para obter o nome formatado do ingresso
function getNomeIngresso(tipo) {
    switch (tipo) {
        case 'pista': return 'Pista';
        case 'superior': return 'Cadeira Superior';
        case 'inferior': return 'Cadeira Inferior';
        default: return '';
    }
}

// Inicializa as quantidades ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarQuantidadesDisponiveis);

