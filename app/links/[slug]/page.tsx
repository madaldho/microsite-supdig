import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface LinkPageProps {
  params: {
    slug: string;
  };
}

export default async function LinkPage({ params }: LinkPageProps) {
  const { slug } = params;

  const entries = await contentfulClient.getEntries({
    content_type: 'link',
    'fields.slug': slug,
  });

  if (!entries.items.length) {
    return notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = entries.items[0].fields as any;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Ad Space */}
      <div className="w-full p-4 bg-gray-100 border-b">
        <div className="max-w-screen-lg mx-auto h-24 flex items-center justify-center">
          <span className="text-gray-400">Advertisement</span>
        </div>
      </div>

      {/* Main Content with Side Ads */}
      <div className="flex justify-between gap-8 px-4 py-12 max-w-screen-2xl mx-auto">
        {/* Left Ad Space */}
        <div className="hidden lg:block w-64">
          <div className="sticky top-4 h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Advertisement</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto">
          <Link
            href={item.redirectUrl}
            className="block group bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src={`https:${item.image.fields.file.url}`}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Ad Space */}
        <div className="hidden lg:block w-64">
          <div className="sticky top-4 h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Advertisement</span>
          </div>
        </div>
      </div>

      {/* Bottom Ad Space */}
      <div className="w-full p-4 bg-gray-100 border-t">
        <div className="max-w-screen-lg mx-auto h-24 flex items-center justify-center">
          <span className="text-gray-400">Advertisement</span>
        </div>
      </div>
    </div>
  );
}