// Função para adicionar produtos ao carrinho
function adicionar() {
    const produtoSelect = document.getElementById('produto');
    const quantidadeInput = document.getElementById('quantidade');
    const listaProdutos = document.getElementById('lista-produtos');
    
    // Validação da quantidade
    let quantidade = parseInt(quantidadeInput.value);
    
    if (isNaN(quantidade) || quantidade < 1) {
        alert('A quantidade mínima é 1!');
        quantidadeInput.value = 1;
        quantidadeInput.focus();
        return;
    }
    
    if (quantidade > 10) {
        alert('A quantidade máxima é 10!');
        quantidadeInput.value = 10;
        quantidadeInput.focus();
        return;
    }
    
    // Processar produto selecionado
    const produtoTexto = produtoSelect.value;
    const [nomeProduto, precoTexto] = produtoTexto.split(' - R$');
    const preco = parseFloat(precoTexto);
    const subtotal = quantidade * preco;
    
    // Criar novo item no carrinho
    const produtoElement = document.createElement('section');
    produtoElement.className = 'carrinho__produtos__produto';
    produtoElement.innerHTML = `
        <span class="texto-azul">${quantidade}x</span> ${nomeProduto.trim()} <span class="texto-azul">R$${subtotal.toFixed(2)}</span>
    `;
    
    listaProdutos.appendChild(produtoElement);
    atualizarTotal();
    
    // Limpa o campo de quantidade e coloca o foco nele
    quantidadeInput.value = '';
    quantidadeInput.focus();
}

// Função para limpar o carrinho
function limpar() {
    const listaProdutos = document.getElementById('lista-produtos');
    
    if (listaProdutos.children.length === 0) {
        alert('O carrinho já está vazio!');
        return;
    }
    
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        listaProdutos.innerHTML = '';
        document.getElementById('valor-total').textContent = 'R$0.00';
    }
}

// Função para atualizar o total
function atualizarTotal() {
    const produtos = document.querySelectorAll('.carrinho__produtos__produto');
    let total = 0;
    
    produtos.forEach(produto => {
        const spans = produto.querySelectorAll('.texto-azul');
        if (spans.length >= 2) {
            const precoTexto = spans[1].textContent.replace('R$', '');
            total += parseFloat(precoTexto);
        }
    });
    
    document.getElementById('valor-total').textContent = `R$${total.toFixed(2)}`;
}

// Validação em tempo real da quantidade
document.getElementById('quantidade').addEventListener('input', function() {
    let valor = parseInt(this.value) || 0;
    
    if (valor < 1) {
        this.value = 1;
    } else if (valor > 10) {
        this.value = 10;
    }
});

// Inicialização - Garante carrinho vazio ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = ''; // Remove qualquer conteúdo inicial
    document.getElementById('valor-total').textContent = 'R$0.00';
});

// Adicione isto ao seu código se quiser remover itens individualmente (clicando neles)
document.getElementById('lista-produtos').addEventListener('click', function(e) {
    if (e.target.closest('.carrinho__produtos__produto') && 
        confirm('Remover este item do carrinho?')) {
        const item = e.target.closest('.carrinho__produtos__produto');
        item.remove();
        
        // Restaurar exemplo se carrinho ficar vazio
        const lista = document.getElementById('lista-produtos');
        if (lista.children.length === 0) {
            lista.innerHTML = `
                <section class="carrinho__produtos__produto">
                    <span class="texto-azul">1x</span> Celular <span class="texto-azul">R$1400</span>
                </section>
            `;
        }
        atualizarTotal();
    }
});