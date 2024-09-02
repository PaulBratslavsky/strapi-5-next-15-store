import qs from "qs";
import { fetchData } from "@/lib/fetchData";

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function getGlobalData() {
  const path = "/api/global";
  const url = new URL(path, baseURL);

  url.search = qs.stringify({
    populate: {
      logoLink: {
        populate: {
          logoImage: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      foodCategories: {
        populate: {
          categories: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
      },
    },
  });

  return fetchData(url.href);
}

export async function getHomePageData() {
  const path = "/api/home-page";
  const url = new URL(path, baseURL);

  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "blocks.slider": {
            populate: {
              slides: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "blocks.categories-grid": {
            populate: {
              categories: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "blocks.products-grid": {
            populate: {
              products: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                  category: {
                    fields: ["title", "slug", "documentId"],
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return fetchData(url.href);
}

export async function getProductData() {
  const path = "/api/products";
  const url = new URL(path, baseURL);

  url.search = qs.stringify({
    populate: {
      products: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          category: {
            fields: ["title", "slug", "documentId"],
          },
        },
      },
    },
  });

  return fetchData(url.href);
}