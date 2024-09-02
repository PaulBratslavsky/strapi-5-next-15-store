type ComponentType =
  | "blocks.slider"
  | "blocks.categories-grid"
  | "blocks.products-grid";

interface Base<T extends ComponentType, D extends {} = {}> {
  __component: T;
  id: string;
  createdAt: string;
  updatedAt: string;
  data: D;
}

export interface NavLink {
  href: string;
  text: string;
  isExternal: boolean;
  isPrimary: boolean;
}

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  name: string;
}

export type Block = SliderProps | CategoriesGridProps | ProductsGridProps;

export interface SliderProps extends Base<"blocks.slider"> {
  title: string;
  description: string;
  slides: {
    id: string;
    title: string;
    description: string;
    image: StrapiImage;
  }[];
}

interface CategoryProps {
  id: string;
  title: string;
  description: string;
  image: StrapiImage;
  documentId: string;
  slug: string;
}

export interface CategoriesGridProps extends Base<"blocks.categories-grid"> {
  title: string;
  description: string;
  categories: CategoryProps[];
}

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  onSale: boolean;
  priceInCents: number;
  itemQuantityType: string;
  category: CategoryProps;
  image: StrapiImage;
  documentId: string;
  slug: string;
}
export interface ProductsGridProps extends Base<"blocks.products-grid"> {
  title: string;
  description: string;
  products: ProductProps[];
}
