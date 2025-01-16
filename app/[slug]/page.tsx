import { contentfulClient } from "@/lib/contentful";
import LinkButton from "@/components/LinkButton";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: "link",
  });

  return entries.items.map((item: unknown) => ({
    slug: item.fields.slug,
  }));
}

async function getLink(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: "link",
    "fields.slug": slug,
  });

  if (entries.items.length === 0) {
    return null;
  }

  const item = entries.items[0];
  return {
    title: item.fields.title,
    subtitle: item.fields.description,
    imageUrl: `https:${item.fields.image.fields.file.url}`,
    redirectUrl: item.fields.redirectUrl,
  };
}

export default async function LinkPage({ params }: { params: { slug: string } }) {
  const link = await getLink(params.slug);

  if (!link) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {link.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{link.subtitle}</p>
        </div>
        <LinkButton
          title={link.title}
          subtitle={link.subtitle}
          imageUrl={link.imageUrl}
          redirectUrl={link.redirectUrl}
        />
      </div>
    </div>
  );
}

