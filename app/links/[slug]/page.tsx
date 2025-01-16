import { contentfulClient } from "@/lib/contentful";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

// Define proper interfaces for type safety
interface ContentfulImage {
  fields: {
    file: {
      url: string;
    };
  };
}

interface LinkEntry {
  title: string;
  description: string;
  redirectUrl: string;
  image: ContentfulImage;
  slug: string;
}

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function LinkPage({ params }: PageProps) {
  const { slug } = params;

  const entries = await contentfulClient.getEntries({
    content_type: 'link',
    'fields.slug': slug,
  });

  if (!entries.items.length) {
    return notFound();
  }

  const item = entries.items[0].fields as unknown as LinkEntry;

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
                    fill
                    sizes="(max-width: 80px) 100vw, 80px"
                    className="rounded-lg object-cover"
                    priority
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  const entries = await contentfulClient.getEntries({
    content_type: 'link',
    'fields.slug': slug,
  });

  if (!entries.items.length) {
    return {
      title: 'Not Found',
      description: 'The page you\'re looking for does not exist.',
    };
  }

  const item = entries.items[0].fields as unknown as LinkEntry;

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [`https:${item.image.fields.file.url}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: [`https:${item.image.fields.file.url}`],
    },
  };
}