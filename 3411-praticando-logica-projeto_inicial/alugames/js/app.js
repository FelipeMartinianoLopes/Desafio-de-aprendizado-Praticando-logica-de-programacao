function alterarStatus(id) {
    const game = document.getElementById(`game-${id}`);
    const image = game.querySelector('.dashboard__item__img');
    const button = game.querySelector('.dashboard__item__button');
    const isRented = image.classList.contains('dashboard__item__img--rented');

    if (isRented) {
        // Adicionando confirmação para devolução
        if (confirm('Tem certeza que deseja devolver este jogo?')) {
            image.classList.remove('dashboard__item__img--rented');
            button.textContent = 'Alugar';
            button.classList.remove('dashboard__item__button--return');
            updateRentedGamesCount(); // Atualiza o contador após devolução
        }
    } else {
        image.classList.add('dashboard__item__img--rented');
        button.textContent = 'Devolver';
        button.classList.add('dashboard__item__button--return');
        updateRentedGamesCount(); // Atualiza o contador após aluguel
    }
}

// Função para contar e exibir no console a quantidade de jogos alugados
function updateRentedGamesCount() {
    const rentedGames = document.querySelectorAll('.dashboard__item__img--rented');
    console.log(`Total de jogos alugados: ${rentedGames.length}`);
    
    // Se quiser mostrar na tela também, pode adicionar:
    // const counterElement = document.getElementById('rented-games-counter');
    // if (counterElement) {
    //     counterElement.textContent = `Jogos alugados: ${rentedGames.length}`;
    // }
}

// Chama a função quando a página carrega para mostrar o estado inicial
document.addEventListener('DOMContentLoaded', updateRentedGamesCount);