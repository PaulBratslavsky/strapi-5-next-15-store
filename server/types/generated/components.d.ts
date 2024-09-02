import type { Struct, Schema } from '@strapi/strapi';

export interface ElementsSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_slides';
  info: {
    displayName: 'Slide';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    href: Schema.Attribute.String;
  };
}

export interface ElementsLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_logo_links';
  info: {
    displayName: 'LogoLink';
  };
  attributes: {
    logoText: Schema.Attribute.String;
    logoImage: Schema.Attribute.Media<'images'>;
    href: Schema.Attribute.String;
  };
}

export interface ElementsCategories extends Struct.ComponentSchema {
  collectionName: 'components_elements_categories';
  info: {
    displayName: 'Categories';
  };
  attributes: {
    label: Schema.Attribute.String;
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface BlocksSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    slides: Schema.Attribute.Component<'elements.slide', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.slide': ElementsSlide;
      'elements.logo-link': ElementsLogoLink;
      'elements.categories': ElementsCategories;
      'blocks.slider': BlocksSlider;
    }
  }
}
