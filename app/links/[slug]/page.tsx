import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function LinkPage({ params }: PageProps) {
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
      <div className="w-full h-24" id="top-ad" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Ad Space */}
          <div className="hidden lg:block w-64" id="left-ad" />

          {/* Main Content - Centered */}
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

          {/* Right Ad Space */}
          <div className="hidden lg:block w-64" id="right-ad" />
        </div>
      </div>

      {/* Bottom Ad Space */}
      <div className="w-full h-24" id="bottom-ad" />
    </div>
  );
}

// Optional: Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  const entries = await contentfulClient.getEntries({
    content_type: 'link',
    'fields.slug': slug,
  });

  if (!entries.items.length) {
    return {
      title: 'Not Found',
      description: 'The page youre looking for does not exist.',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = entries.items[0].fields as any;

  return {
    title: item.title,
    description: item.description,
  };
}