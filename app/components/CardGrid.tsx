import { Item } from '../types/items'
import Card from './Card'

interface CardGridProps {
  items: Item[]
}

export default function CardGrid({ items }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-1 md:p-4 max-w-3xl mx-auto mb-6">
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}
