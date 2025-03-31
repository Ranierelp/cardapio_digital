"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Tables } from "@/components/table"; // Tabela importada corretamente
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getProdutos } from "../services/api";

// Exemplo de listas de opções para categoria e estabelecimento
const categories = ["Categoria 1", "Categoria 2", "Categoria 3"];
const establishments = ["Estabelecimento 1", "Estabelecimento 2", "Estabelecimento 3"];

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  price: z.string().refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
    message: "O valor deve ser um número válido e maior que 0",
  }),
  quantity: z.string().refine((value) => Number.isInteger(Number(value)) && parseInt(value) > 0, {
    message: "A quantidade deve ser um número inteiro maior que 0",
  }),
  photo: z.instanceof(File).optional(), // O campo de foto será um arquivo
  category: z.string().min(3, "O produto deve ter uma categoria").refine((value) => categories.includes(value), {
    message: "Categoria inválida",
  }),
  // establishment: z.string().min(3, "O produto deve ter um estabelecimento").refine((value) => establishments.includes(value), {
  //   message: "Estabelecimento inválido",
  // }),
});

export default function Produtos() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<any[]>([]); // Defina o tipo de dados para `produtos`
  
  // Buscar produtos da API ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProdutos();
        
        // Filtrando os dados para incluir apenas os campos necessários
        const filteredData = data.map((produto) => ({
          id: produto.id,
          name: produto.name,
          price: produto.price,
          quantity: produto.quantity,
          category: produto.category,
          establishment: produto.establishment,
        }));
  
        setProdutos(filteredData); // Atualiza o estado com os dados filtrados
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      photo: undefined,
      category: "",
      // establishment: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Dados enviados:", data);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/produto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Garantir que estamos enviando JSON
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          photo: data.photo,
          category: data.category,
          // establishment: data.establishment,

        }),
      });
      if (response.ok) {
        alert("Produto adicionado com sucesso!");
  
        // Atualiza a lista de Produtos
        const updatedData = await getProdutos();
        setProdutos(updatedData);
      } else {
        const errorData = await response.json();
        console.error("Erro ao enviar os dados:", errorData);
        alert("Erro ao adicionar produto!");
      }
    } catch (error: any) {
      console.error("Erro inesperado ao enviar os dados:", error.message);
      alert("Erro ao adicionar produto!");
    }
  };

  // Função para processar o upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      setPreviewImage(URL.createObjectURL(file)); // Cria uma URL temporária para preview
    }
  };

  // Defina o cabeçalho da tabela dinamicamente
  const headersProdutos = ["ID", "Nome", "Preço", "Quantidade", "Categoria", "Estabelecimento"];

  return (
    <div className="sm:ml-25 sm:mr-12 sm:mt-15  p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Produtos</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Adicionar Produtos</DialogTitle>
              <DialogDescription>
                Insira os detalhes do produto abaixo e clique em salvar.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                          <Input placeholder="Digite uma description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>price</FormLabel>
                      <FormControl>
                          <Textarea type="number" placeholder="Digite o price do produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>quantity</FormLabel>
                      <FormControl>
                          <Input type="number" placeholder="Digite o quantity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="establishment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>establishment</FormLabel>
                      <FormControl>
                          <Input type="number" placeholder="Digite a establishment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                          <Input placeholder="Digite a categoria" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Foto do Produto</FormLabel>
                  <FormControl>
                      <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {previewImage && (
                  <div className="mt-2">
                      <p className="text-sm text-gray-500">Pré-visualização:</p>
                      <img src={previewImage} alt="Preview" className="w-full max-h-40 object-cover rounded-md shadow-md" />
                  </div>
                )}
                <DialogFooter>
                  <Button type="submit">Salvar Produto</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Passa os dados e o cabeçalho para a Tabela */}
      <div>
        <div className="retangulo">
          <Tables dados={produtos} headers={headersProdutos} />
        </div>
      </div>
    </div>
  );
}
