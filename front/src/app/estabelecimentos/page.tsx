"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tables } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { addEstabelecimento, getEstabelecimentos } from "../services/api";

// Esquema de validação
const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(3, "O e-mail deve ter pelo menos 3 caracteres"),
  phone: z.string().min(5, "O telefone deve ter pelo menos 5 caracteres"),
  cnpj: z.string().min(3, "O CNPJ deve ter pelo menos 3 caracteres"),
});

export default function Produtos() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  // Buscar estabelecimentos na API
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEstabelecimentos();
        setEstabelecimentos(data);
      } catch (error) {
        console.error("Erro ao buscar estabelecimentos:", error);
      }
    }
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cnpj: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Dados do formulário:", data); // Verificar os dados antes do envio
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/estabelecimento/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Garantir que estamos enviando JSON
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          cnpj: data.cnpj,
        }),
      });
  
      if (response.ok) {
        alert("Produto adicionado com sucesso!");
  
        // Atualiza a lista de estabelecimentos
        const updatedData = await getEstabelecimentos();
        setEstabelecimentos(updatedData);
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
  

  return (
    <div className="sm:ml-25 sm:mr-12 sm:mt-15  p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">Estabelecimentos</h1>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Digite o e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o CNPJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Salvar Produto</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      </div>

    <div className="retangulo">
      {/* Passa os estabelecimentos para a Tabela */}
      <Tables dados={estabelecimentos} />
    </div>
    </div>
  );
}
