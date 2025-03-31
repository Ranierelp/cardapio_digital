"use client";

import React, { useEffect, useState } from "react";
import { CarouselSize } from "@/components/cards";
import { Input } from "@/components/ui/input";
import { getCategorias, getProdutos } from "@/app/services/api"; // Certifique-se de que o caminho do serviço está correto

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]); // Estado para armazenar as categorias e os produtos
  const [loading, setLoading] = useState<boolean>(true); // Estado para verificar o carregamento

  // Função para buscar as categorias e seus produtos
  const fetchData = async () => {
    try {
      const categoriesData = await getCategorias();
      const productsData = await getProdutos();

      // Organizar os produtos por categoria
      const categoriesWithProducts = categoriesData.map((category: any) => {
        const categoryProducts = productsData.filter(
          (product: any) => product.category === category.id
        );
        return { ...category, items: categoryProducts };
      });

      setCategories(categoriesWithProducts);
      setLoading(false); // Dados carregados
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false); // Dados carregados, mas com erro
    }
  };

  // Chama a função de fetch ao carregar o componente
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem de carregamento
  }

  return (
    <main className="sm:ml-45 p-4">
      <h1 className="text-center font-lactosa text-5xl my-8">Cardápio Digital</h1>
      <div className="mb-10">
        <Input placeholder="Buscar" />
      </div>

      <CarouselSize categories={categories} />
    </main>
  );
}
