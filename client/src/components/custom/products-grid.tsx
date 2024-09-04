import type { ProductsGridProps, ProductProps } from "@/lib/types";
import { StrapiImage } from "@/components/custom/strapi-image";
import ProductModal from "@/components/custom/product-modal";
import { formatPrice } from "@/lib/utils";
import { AddItemToCartForm } from "@/components/forms/add-item-to-cart-form";
import { CartSummary } from "@/components/custom/cart";

function ProductItem({
  product,
  children,
}: {
  readonly product: ProductProps;
  readonly children: React.ReactNode;
}) {
  "use client";

  return (
    <div
      key={product.id}
      className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative pt-[100%]">
        <StrapiImage
          src={product.image.url}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.onSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            On Sale
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 flex-grow line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            ${formatPrice(product.priceInCents)}
          </span>
          <ProductModal>
            <AddItemToCartForm product={product} />
            {children}
          </ProductModal>
        </div>
      </div>
    </div>
  );
}

export function ProductsGrid({
  title,
  description,
  products,
}: Readonly<ProductsGridProps>) {
  return (
    <div className="container mx-auto my-12">
      <div className="flex flex-col gap-2 items-center justify-center mb-12">
        {title && <h2 className="text-4xl font-bold">{title}</h2>}
        {description && <p className="text-lg text-gray-600">{description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product}>
            <CartSummary />
          </ProductItem>
        ))}
      </div>
    </div>
  );
}
