'use client'

import { useState, useEffect, useRef } from 'react'
import { Item } from '../types/items'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { LinkButtonProps } from './LinkButton'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  items: (Item | LinkButtonProps)[]
}

// Type guard untuk memeriksa apakah item adalah Item
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isItem(item: any): item is Item {
  return 'description' in item;
}

// Type guard untuk memeriksa apakah item adalah LinkButtonProps
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isLinkButtonProps(item: any): item is LinkButtonProps {
  return 'redirectUrl' in item;
}

export default function SearchBar({ searchTerm, setSearchTerm, items }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const words = searchTerm.toLowerCase().split(' ')
    const lastWord = words[words.length - 1]
    
    if (lastWord) {
      const newSuggestions = items
        .flatMap(item => isLinkButtonProps(item) ? [item.title, item.subtitle] : [item.title, item.description])
        .flatMap(text => text.toLowerCase().split(' '))
        .filter((word, index, self) => self.indexOf(word) === index)
        .filter(word => word.startsWith(lastWord))
        .slice(0, 5)
      
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm, items])

  const handleSuggestionClick = (suggestion: string) => {
    const words = searchTerm.split(' ')
    words[words.length - 1] = suggestion
    setSearchTerm(words.join(' '))
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari layanan..."
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-800 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {showSuggestions && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            const item = items.find(item => 
              (isItem(item) || isLinkButtonProps(item)) && item.title.toLowerCase().includes(suggestion.toLowerCase())
            )
            return (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center"
              >
                {item && (
                  <Image
                    src={isLinkButtonProps(item) ? item.redirectUrl : item.imageUrl}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded-lg mr-3 object-cover"
                  />
                )}
                <span className="text-gray-700">{suggestion}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
