
import { contentfulClient } from "@/lib/contentful";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
  title: "Daftar Link",
  description: "Halaman daftar link dari Contentful",
};

export default async function LinksPage() {
  const entries = await contentfulClient.getEntries({
    content_type: "link",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = entries.items.map((item: any) => ({
    title: item.fields.title,
    subtitle: item.fields.description,
    imageUrl: `https:${item.fields.image.fields.file.url}`,
    redirectUrl: item.fields.redirectUrl,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Daftar Link
          </h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.redirectUrl}
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <Image
                    src={link.imageUrl}
                    alt={link.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {link.subtitle}
                  </p>
                </div>

                <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}