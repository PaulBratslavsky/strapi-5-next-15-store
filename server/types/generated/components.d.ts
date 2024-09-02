import type { Struct, Schema } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.logo-link': ElementsLogoLink;
      'elements.categories': ElementsCategories;
    }
  }
}
