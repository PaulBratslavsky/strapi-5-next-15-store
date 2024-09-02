import type { CategoriesGridProps } from "@/lib/types";
import { StrapiImage } from "@/components/custom/strapi-image";
import Link from "next/link";

export function CategoriesGrid({
  title,
  description,
  categories,
}: CategoriesGridProps) {
  return (
    <div className="container mx-auto my-12">
      <div className="flex flex-col gap-2 items-center justify-center mb-12">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="bg-gray-100 p-4 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-bold">{category.title}</h3>
            <StrapiImage
              src={category.image.url}
              alt={category.title}
              width={300}
              height={300}
              className="w-full h-full object-cover p-6"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
