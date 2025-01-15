import Image from 'next/image'
import { Share2 } from 'lucide-react'

type ProfileHeaderProps = {
  avatarUrl: string
  title: string
  subtitle: string
  description: string
}

export default function ProfileHeader({ avatarUrl, title, subtitle, description }: ProfileHeaderProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center max-w-2xl mx-auto mb-6">
      <button 
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          <Image
            src={avatarUrl}
            alt={title}
            layout="fill"
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg font-medium text-blue-600">{subtitle}</p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

