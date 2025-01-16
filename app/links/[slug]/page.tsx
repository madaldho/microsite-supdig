// app/links/[slug]/page.tsx
import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

// Ini yang penting: kita definisikan tipe langsung di parameter fungsi
export default async function LinkPage({ 
  params: { slug } 
}: { 
  params: { slug: string } 
}) {
  if (!slug) return notFound();

  try {
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <div className="flex-1 flex items-center justify-center">
              <Link
                href={item.redirectUrl}
                className="block group bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg max-w-xl w-full"
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
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching link:', error);
    return notFound();
  }
}

// Metadata juga pakai tipe inline
export async function generateMetadata({ 
  params: { slug } 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  if (!slug) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'link',
      'fields.slug': slug,
    });

    if (!entries.items.length) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = entries.items[0].fields as any;

    return {
      title: item.title,
      description: item.description,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred',
    };
  }
}