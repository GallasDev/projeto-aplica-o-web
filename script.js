document.getElementById('form-produto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = document.getElementById('preco').value;
  const descricao = document.getElementById('descricao').value;

  await fetch('http://localhost:3000/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco, descricao })
  });

  carregarProdutos();
});

async function carregarProdutos() {
  const res = await fetch('http://localhost:3000/api/produtos');
  const produtos = await res.json();

  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';
  produtos.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = `${prod.nome} - R$ ${prod.preco} - ${prod.descricao}`;
    lista.appendChild(li);
  });
}

carregarProdutos();
