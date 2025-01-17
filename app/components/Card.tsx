import Image from "next/image";
import { Item } from "../types/items";


interface CardProps {
  item: Item;
}

export default function Card({ item }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative h-48">
        <Image
          src={item.imageUrl || "/favicon.png"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h2>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <a
          href={item.redictUrl}
          target="_blank" // Membuka di tab baru
          rel="noopener noreferrer" // Keamanan tambahan
          className="mt-4 block text-center w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
          Lihat Detail
        </a>
      </div>
    </div>
  );
}
