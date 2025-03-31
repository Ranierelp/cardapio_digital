const ESTABELECIMENTO_URL = "http://127.0.0.1:8000/api/v1/estabelecimento/";
const PRODUTOS_URL = "http://127.0.0.1:8000/api/v1/produto/";
const CATEGORIA_URL = "http://127.0.0.1:8000/api/v1/categoria/";

export async function getEstabelecimentos() {
  const response = await fetch(ESTABELECIMENTO_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar estabelecimentos");
  }
  return response.json();
}

export async function addEstabelecimento(dados: any) {
  const formData = new FormData();

  // Adiciona todos os campos ao FormData
  Object.keys(dados).forEach((key) => {
    if (dados[key]) {
      formData.append(key, dados[key]);
    }
  });

  const response = await fetch(ESTABELECIMENTO_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar estabelecimento");
  }

  return response.json();
}

export async function getProdutos() {
  const response = await fetch(PRODUTOS_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar Produtos");
  }
  return response.json();
}

export async function addProdutos(dados: any) {
  const formData = new FormData();

  // Adiciona todos os campos ao FormData
  Object.keys(dados).forEach((key) => {
    if (dados[key]) {
      formData.append(key, dados[key]);
    }
  });

  const response = await fetch(PRODUTOS_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar Produtos");
  }

  return response.json();
}

export async function getCategorias() {
  const response = await fetch(CATEGORIA_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  return response.json();
}