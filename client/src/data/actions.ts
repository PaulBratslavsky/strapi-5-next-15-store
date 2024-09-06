"use server";
import { z } from "zod";
import qs from "qs";
import { fetchAPI } from "@/lib/fetchAPI";
import { getAuthToken, getUserMeLoader } from "@/lib/auth/services";
import { revalidateTag } from "next/cache";
import { getCartItems } from "@/data/loaders";
import { clearUserCartService } from "./services";

export async function deleteCartAction(formData: FormData) {
  const token = await getAuthToken();
  const user = await getUserMeLoader();
  if (!token || !user.ok) return null;

  const documentId = formData.get("documentId");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const path = "/api/order-items/" + documentId;

  const url = new URL(path, BASE_URL);
  const data = await fetchAPI(url.href, {
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

  const data = await fetchAPI(url.href, {
    method: "POST",
    authToken: token,
    body,
  });

  revalidateTag("cart-items");

  return {
    data: { ...data },
  };
}

const schemaOrder = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  streetAddress: z.string().min(1, {
    message: "Street address is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  zip: z
    .string()
    .regex(/^\d{5}$/, { message: "Zip code must be a 5-digit number" })
    .transform(Number),
  phone: z.string().min(1).max(10, {
    message: "Phone number must be 10 digits",
  }),
});

export async function createOrderAction(prevState: any, formData: FormData) {
  const token = await getAuthToken();
  const user = await getUserMeLoader();
  if (!token || !user.ok) return null;

  const formDataObj = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    streetAddress: formData.get("streetAddress"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    phone: formData.get("phone"),
  };

  const validatedFields = schemaOrder.safeParse(formDataObj);

  if (!validatedFields.success) {
    return {
      ...prevState,
      data: { ...prevState.data, ...formDataObj },
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const path = "/api/orders";

  const url = new URL(path, BASE_URL);

  const userCartItems = await getCartItems();
  const cartItems = userCartItems?.data;

  console.log(cartItems, "cartItems");

  if (cartItems.length === 0) {
    return {
      ...prevState,
      strapiErrors: {
        error: {
          message: "No items in cart",
        },
      },
      zodErrors: null,
    };
  }

  const itemsToAddToOrder = cartItems?.map((item: any) => item.item.documentId);
  const itemsToRemoveFromCart = userCartItems?.data?.map((item: any) => item.documentId);

  console.log(itemsToAddToOrder);
  console.log(itemsToRemoveFromCart);


  const body = {
    data: {
      user: user.data.id,
      customerInfo: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        streetAddress: validatedFields.data.streetAddress,
        state: validatedFields.data.state,
        zip: validatedFields.data.zip,
        phone: validatedFields.data.phone,
      },
      dateReceived: new Date(),
      orderStatus: "RECEIVED",
      orderItems: {
        connect: [...itemsToAddToOrder],
      },
    },
  };

  const responseData = await fetchAPI(url.href, {
    method: "POST",
    authToken: token,
    body,
  });

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Place Order.",
    };
  }

  const deletedItems = await clearUserCartService(token, itemsToRemoveFromCart);
  console.log(deletedItems, "deletedItems");
  revalidateTag("cart-items");

  return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    message: "Order submitted successfully",
  };
}
