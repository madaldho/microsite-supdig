// app/links/[slug]/page.tsx
import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

interface Params {
  slug: string;
}

interface PageProps {
  params: Params;
}

export default async function LinkPage({ params }: PageProps) {
  const { slug } = params;

  if (!slug) return notFound();

  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'link',
      'fields.slug': slug,
    });

    if (!entries.items.length) {
      return notFound();
    }

    // Menghindari any, kita gunakan type Contentful Field
    const item = entries.items[0].fields as {
      title: string;
      description: string;
      redirectUrl: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
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
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching link:', error);
    return notFound();
  }
}

// Metadata generator untuk halaman dinamis
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

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

    // Menghindari any, kita gunakan type Contentful Field
    const item = entries.items[0].fields as {
      title: string;
      description: string;
    };

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
