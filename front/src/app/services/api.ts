const API_URL = "http://127.0.0.1:8000/api/v1/estabelecimento/";

export async function getEstabelecimentos() {
  const response = await fetch(API_URL);
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

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar estabelecimento");
  }

  return response.json();
}
