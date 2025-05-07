let amigos = [];

function adicionar() {
    const nomeAmigo = document.getElementById('nome-amigo');
    const listaAmigos = document.getElementById('lista-amigos');
    
    if (nomeAmigo.value === '') {
        alert('Por favor, digite um nome!');
        return;
    }
    
    if (amigos.includes(nomeAmigo.value)) {
        alert('Este nome já foi adicionado!');
        nomeAmigo.value = '';
        return;
    }
    
    amigos.push(nomeAmigo.value);
    
    if (listaAmigos.textContent === '') {
        listaAmigos.textContent = nomeAmigo.value;
    } else {
        listaAmigos.textContent += ', ' + nomeAmigo.value;
    }
    
    nomeAmigo.value = '';
}

function sortear() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear!');
        return;
    }
    
    const listaSorteio = document.getElementById('lista-sorteio');
    listaSorteio.innerHTML = '';
    
    // Embaralha a lista de amigos
    const embaralhado = [...amigos];
for (let i = embaralhado.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [embaralhado[i], embaralhado[j]] = [embaralhado[j], embaralhado[i]];
}
    
    // Verifica se o sorteio é válido (ninguém sorteia a si mesmo)
    let sorteioValido = false;
    let resultadoSorteio = [];
    
    while (!sorteioValido) {
        resultadoSorteio = [];
        sorteioValido = true;
        
        for (let i = 0; i < amigos.length; i++) {
            const amigo = amigos[i];
            let amigoSorteado;
            
            // Se for o último e o único disponível for ele mesmo, reinicia o sorteio
            if (i === amigos.length - 1 && embaralhado[i] === amigo) {
                sorteioValido = false;
                break;
            }
            
            // Encontra alguém que não seja ele mesmo
            if (embaralhado[i] === amigo) {
                // Troca com o próximo (garantindo que não seja o último)
                if (i < amigos.length - 1) {
                    [embaralhado[i], embaralhado[i + 1]] = [embaralhado[i + 1], embaralhado[i]];
                } else {
                    // Se for o último, troca com o primeiro
                    [embaralhado[i], embaralhado[0]] = [embaralhado[0], embaralhado[i]];
                }
            }
            
            resultadoSorteio.push(`${amigo} --> ${embaralhado[i]}`);
        }
    }
    
    // Exibe o resultado
    resultadoSorteio.forEach(item => {
        const paragrafo = document.createElement('p');
        paragrafo.textContent = item;
        listaSorteio.appendChild(paragrafo);
    });
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('lista-sorteio').textContent = '';
}