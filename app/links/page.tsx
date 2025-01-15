import { contentfulClient } from "@/lib/contentful";
import LinkButton from "../components/LinkButtonn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Link",
  description: "Halaman daftar link dari Contentful",
};

export default async function LinksPage() {
  const entries = await contentfulClient.getEntries({
    content_type: "link", // Sesuaikan dengan content type ID di Contentful
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = entries.items.map((item: any) => ({
    title: item.fields.title,
    subtitle: item.fields.description,
    imageUrl: `https:${item.fields.image.fields.file.url}`,
    redirectUrl: item.fields.redirectUrl,
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Daftar Link</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <LinkButton
            key={index}
            title={link.title}
            subtitle={link.subtitle}
            imageUrl={link.imageUrl}
            redirectUrl={link.redirectUrl}
          />
        ))}
      </div>
    </div>
  );
}
