import Link from 'next/link';
import Image from 'next/image';
import { LinkIcon } from 'lucide-react';

export type LinkButtonnProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  redirectUrl: string;
};

export default function LinkButtonn({ title, subtitle, imageUrl, redirectUrl }: LinkButtonnProps) {
  return (
    <Link
      href={redirectUrl}
      className="group flex items-center bg-white rounded-lg p-3 hover:bg-gray-50 transition-colors duration-300 shadow-md max-w-2xl mx-auto mb-6"
    >
      <div className="flex-shrink-0 w-10 h-10 relative mr-3">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          </div>
          <LinkIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </div>
      </div>
    </Link>
  );
}
