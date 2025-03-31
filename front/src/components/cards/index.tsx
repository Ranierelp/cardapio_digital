"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize({ categories = [] }: { categories?: any[] }) {
  const [modalItem, setModalItem] = React.useState<any | null>(null);

  // Função para abrir o modal com os detalhes do item
  const openModal = (item: any) => {
    setModalItem(item);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalItem(null);
  };

  // Se categories estiver vazio ou indefinido, exibe uma mensagem
  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma categoria encontrada.</p>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold">{category.name}</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-[1550px] mx-auto"
          >
            <CarouselContent>
              {(category.items ?? []).map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/8">
                  <div className="">
                    <Card>
                      <CardContent className="relative w-full h-48 p-0 m-0">
                        {item.photo ? (
                          <img
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            src={item.photo}
                            alt={item.name}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                            <span className="font-bold text-gray-600">{item.name}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] w-[80px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.name}
                      </span>
                      <span className="text-[14px] text-amber-600">R${item.price}</span>
                    </div>
                    <button
                      onClick={() => openModal(item)}
                      className=""
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}

      {/* Modal de exibição do item */}
      {modalItem && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.77)] flex justify-center items-center">
          <div className="flex justify-center items-center bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg w-[90%] max-w-3xl">
            <div className="flex justify-center items-center p-4">
              {modalItem.photo ? (
                <img className="w-full h-48 object-cover rounded-lg" src={modalItem.photo} alt={modalItem.name} />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg">
                  <span className="font-bold text-gray-600">{modalItem.name}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center ml-4 p-4">
              <h3 className="text-2xl font-bold">{modalItem.name}</h3>
              <p className="font-extralight">{modalItem.description}</p>
              <span className="text-amber-600 font-bold">R${modalItem.price}</span>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
