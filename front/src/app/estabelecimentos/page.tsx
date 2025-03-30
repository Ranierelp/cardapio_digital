"use client";

import React, { useState } from "react";
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

// Esquema de validação
const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  username: z.string().min(3, "O usuário deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  price: z.string().min(1, "O valor deve ser maior que 0"),
  quantity: z.string().min(1, "O produto deve ter pelo menos 1 item"),
  photo: z.instanceof(File).optional(), // O campo de foto será um arquivo
  category: z.string().min(3, "O produto deve ter uma categoria"),
});

export default function Produtos() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      price: "",
      quantity: "",
      photo: undefined,
      category: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados enviados:", data);
    alert("Produto adicionado com sucesso!");
  };

  // Função para processar o upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      setPreviewImage(URL.createObjectURL(file)); // Cria uma URL temporária para preview
    }
  };

  return (
    <div className="sm:ml-45 p-4">
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                        <Input placeholder="Digite o nome de usuário" {...field} />
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
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Digite a descrição do produto" {...field} />
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
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Digite o preço" {...field} />
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
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Digite a quantidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


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

      <Tables />
    </div>
  );
}
