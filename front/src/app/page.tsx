import { CarouselSize } from "@/components/cards"
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="sm:ml-45 p-4">
      <h1 className="text-center font-lactosa text-5xl my-8">Cardapio Digital</h1>
      <div className="mb-10">
        <Input placeholder="Buscar" />
      </div>
      <CarouselSize />
      <CarouselSize />
      <CarouselSize />
    </main>
  );
}
