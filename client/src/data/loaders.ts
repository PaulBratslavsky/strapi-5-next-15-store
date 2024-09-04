"use server";
import qs from "qs";
import { fetchData } from "@/lib/fetchData";
import { getAuthToken, getUserMeLoader } from "@/lib/auth/services";

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

  return fetchData(url.href, { method: "GET" });
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
  return fetchData(url.href, { method: "GET" });
}

export async function getProductData(category?: string | null, query?: string) {

  const path = "/api/products";
  const url = new URL(path, baseURL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["title", "slug", "documentId"],
      },
    },
    filters: {
      ...(category && { category: { slug: { $containsi: category } } }),

      $or: [
        { name: { $containsi: query ?? "" } },
        { description: { $containsi: query ?? "" } },
      ],
    },
  });

  return fetchData(url.href, { method: "GET" });
}

export async function getCartItems() {
  const token = await getAuthToken();
  const user = await getUserMeLoader();

  if (!token || !user.ok) return null;
  const userId = user.data.id;

  const path = "/api/order-items";
  const url = new URL(path, baseURL);

  url.search = qs.stringify({
    filters: {
      user: {
        id: {
          $eq: userId,
        },
      },
    },
    populate: {
      item: {
        
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  });

  return fetchData(url.href, {
    method: "GET",
    authToken: token,
    next: { tags: ["cart-items"] },
  });
}
