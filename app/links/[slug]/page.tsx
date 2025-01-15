import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Top Ad Space */}
      <div className="w-full p-4 bg-gray-200 text-center">
        <div className="max-w-screen-lg mx-auto h-24 flex items-center justify-center">
          <span className="text-gray-500">Ad Space (Top)</span>
        </div>
      </div>

      {/* Main Content with Side Ads */}
      <div className="flex justify-between px-4 py-12 max-w-screen-2xl mx-auto">
        {/* Left Ad Space */}
        <div className="hidden lg:block w-64 bg-gray-200">
          <div className="h-[600px] flex items-center justify-center">
            <span className="text-gray-500">Ad Space (Left)</span>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="flex-1 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={item.redirectUrl}
              className="group block bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-20 h-20 relative">
                  <Image
                    src={`https:${item.image.fields.file.url}`}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Ad Space */}
        <div className="hidden lg:block w-64 bg-gray-200">
          <div className="h-[600px] flex items-center justify-center">
            <span className="text-gray-500">Ad Space (Right)</span>
          </div>
        </div>
      </div>

      {/* Bottom Ad Space */}
      <div className="w-full p-4 bg-gray-200 text-center">
        <div className="max-w-screen-lg mx-auto h-24 flex items-center justify-center">
          <span className="text-gray-500">Ad Space (Bottom)</span>
        </div>
      </div>
    </div>
  );
}