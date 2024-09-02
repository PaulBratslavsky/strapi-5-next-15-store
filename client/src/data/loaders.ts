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
