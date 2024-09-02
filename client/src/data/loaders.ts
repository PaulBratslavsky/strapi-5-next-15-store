import qs from "qs";
const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

async function fetchAPI(path: string, params: { [key: string]: any }) {
  const url = new URL(path, baseURL);
  url.search = qs.stringify(params);
  const response = await fetch(url.href);

  if (!response.ok) throw Error(`HTTP error! status: ${response.status} `);
  return response.json();
}

export async function getGlobalData() {
  const query = {
    populate: {
      logoLink: {
        populate: {
          logoImage: {
            fields: ["url", "alternativeText"],
          }
        }
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
        }
      },
    },
  };
  return fetchAPI("/api/global", query);
}

export default baseURL;
