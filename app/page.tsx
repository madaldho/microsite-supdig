'use client'

import { useState, useEffect } from 'react'
import ProfileHeader from './components/ProfileHeader'
import FeatureCard from './components/FeatureCard'
import LinkButton from './components/LinkButton'
import SearchBar from './components/SearchBar'
import CardGrid from './components/CardGrid'
import { items, Item } from './types/items'

const features = [
  "Produk digital berkualitas premium",
  "Pengiriman ke seluruh dunia",
  "Layanan dukungan pelanggan 24/7",
  "Manfaat eksklusif untuk anggota",
  "Garansi produk termasuk"
]

const links = [
  {
    title: "Super Digital",
    subtitle: "Abangnya Produk Produkan",
    imageUrl: "/favicon.png",
    redirectUrl: "#"
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<(Item | typeof links[0])[]>([...items, ...links])

  useEffect(() => {
    const filtered = [...items, ...links].filter(item =>
      'redirectUrl' in item
        ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
        : item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredItems(filtered)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader
          avatarUrl="/favicon.png"
          title="SuperDigital"
          subtitle="Penyedia Digital Produk Terbaik"
          description="number one in your future"
        />
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          items={[...items, ...links]} 
        />

<div className="space-y-4">
  {filteredItems.some(item => 'redirectUrl' in item) && (
    filteredItems
      .filter(item => 'redirectUrl' in item)
      .map((item, index) => (
        <LinkButton
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
          redirectUrl={item.redirectUrl}
        />
      ))
  )}

  {filteredItems.some(item => !('redirectUrl' in item)) && (
    <CardGrid items={filteredItems.filter((item): item is Item => !('redirectUrl' in item))} />
  )}
</div>

        <FeatureCard
          title="All Premium products include:"
          features={features}
          productName="VIP Pokoknya"
          ctaText="Beli Lah"
          ctaLink="#"
        />
      </div>
    </div>
  )
}

