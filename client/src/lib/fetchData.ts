type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export async function fetchData(
  url: string,
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    authToken?: string;
    body?: any;
    next?: NextFetchRequestConfig;
  }
) {
  const { method, authToken, body, next } = options;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    
    // Check if the response has content before parsing JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}






