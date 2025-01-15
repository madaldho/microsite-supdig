import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion'; // Import Framer Motion

interface Params {
  slug: string;
}

export default async function LinkPage({ params }: { params: Params }) {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Link
          href={item.redirectUrl}
          className="group flex items-center bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300 shadow-lg"
        >
          {/* Gambar dengan animasi hover */}
          <motion.div
            className="flex-shrink-0 w-14 h-14 relative mr-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`https:${item.image.fields.file.url}`}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>

          {/* Konten teks */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              </div>

              {/* Ikon link dengan animasi hover */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
