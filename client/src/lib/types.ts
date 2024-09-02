type ComponentType = "blocks.slider";

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

export type Block = SliderProps;

export interface SliderProps extends Base<"blocks.slider"> {
  title: string;
  description: string;
  slides: {
    id: string;
    title: string;
    description: string;
    image: StrapiImage;
  }[]
}
