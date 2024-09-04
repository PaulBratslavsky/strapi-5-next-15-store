import { SearchBar } from "@/components/custom/search-bar";
import { getProductData } from "@/data/loaders";
import { ProductsGrid } from "@/components/custom/products-grid";
import { ProductsGridProps } from "@/lib/types";

interface PageProps {
  params: {
    category: string;
  };
  searchParams: {
    query?: string;
  };
}

async function loader(category: string | null, query: string) {
  const data = await getProductData(category, query);
  return { ...data };
}

export default async function CategoryRoute({
  params,
  searchParams,
}: Readonly<PageProps>) {

  const query = searchParams.query ?? "";
  const category = params.category === "all" ? null : params.category;

  const { data } = await loader(category, query);
  if (!data) return <div>No data found</div>;

  const productsGridData = {
    title: data.title,
    products: data,
  } as ProductsGridProps;

  return (
    <div className="container mx-auto my-12">
      <SearchBar />
      <ProductsGrid {...productsGridData} />
    </div>
  );
}
