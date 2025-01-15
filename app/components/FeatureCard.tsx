import { Check } from 'lucide-react'

type FeatureCardProps = {
  title: string
  features: string[]
  productName: string
  ctaText: string
  ctaLink: string
}

export default function FeatureCard({ title, features, productName, ctaText, ctaLink }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Features Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Card Section */}
        <div className="flex flex-col">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <div className="bg-blue-600 text-white px-6 py-4 text-center font-bold text-lg rounded-t-2xl">
              BEST VALUE
            </div>
            <div className="p-6 -mt-3 flex flex-col rounded-2xl overflow-hidden border items-center text-center space-y-4 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">{productName}</h3>
              <a
                href={ctaLink}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
              >
                {ctaText}
              </a>
              <p className="text-sm text-gray-500">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

