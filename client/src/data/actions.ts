"use server";

import qs from "qs";
import { fetchData } from "@/lib/fetchData";
import { getAuthToken, getUserMeLoader } from "@/lib/auth/services";
import { revalidateTag } from "next/cache";

interface CartItem {
  id: number;
  documentId: string;
  item: {
    name: string;
    priceInCents: number;
    id: number;
    documentId: string;
  };
  quantity: number;
}

export async function deleteCartAction(formData: FormData) {
  const token = await getAuthToken();
  const user = await getUserMeLoader();
  if (!token || !user.ok) return null;

  const documentId = formData.get("documentId");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const path = "/api/order-items/" + documentId;

  const url = new URL(path, BASE_URL);
  const data = await fetchData(url.href, {
    method: "DELETE",
    authToken: token,
  });

  revalidateTag("cart-items");

  return {
    data: { ...data },
  };
}

export async function addItemToCartAction(formData: FormData) {
  const token = await getAuthToken();
  const user = await getUserMeLoader();
  if (!token || !user.ok) return null;

  const quantity = formData.get("quantity");
  const productId = formData.get("productId");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const path = "/api/order-items";

  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    filters: {
      user: {
        id: {
          $eq: user.data.id,
        },
      },
    },
    populate: {
      item: {
        fields: ["name", "priceInCents"],
      },
    },
  });

  const body = {
    data: {
      quantity: Number(quantity) || 1,
      user: user.data.id,
      item: {
        connect: [productId],
      },
    },
  };

  const data = await fetchData(url.href, {
    method: "POST",
    authToken: token,
    body,
  });

  revalidateTag("cart-items");

  return {
    data: { ...data },
  };
}
