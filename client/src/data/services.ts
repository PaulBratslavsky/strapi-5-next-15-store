import { fetchAPI } from "@/lib/fetchAPI";

export async function clearUserCartService(
  authToken: string,
  cartItemsIds: string[]
) {
  const deletedItems = await Promise.all(
    cartItemsIds.map(async (documentId) => {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
      const path = "/api/order-items/" + documentId;
      const url = new URL(path, BASE_URL);

      const data = await fetchAPI(url.href, {
        method: "DELETE",
        authToken: authToken,
      });

      return data;
    })
  );

  return deletedItems;
}
