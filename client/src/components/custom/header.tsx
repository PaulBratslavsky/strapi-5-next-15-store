import Link from "next/link";

import { getGlobalData } from "@/data/loaders";
import { getUserMeLoader } from "@/lib/auth/services";
import { LogoutButton } from "@/components/custom/logout-button";

import { Button } from "@/components/ui/button";
import { ItemsDropdown } from "@/components/custom/items-dropdown";
import { StrapiImage } from "@/components/custom/strapi-image";
import { CartModal, CartButton, CartItems } from "@/components/custom/cart";

async function loader() {
  const data = await getGlobalData();
  const user = await getUserMeLoader();
  return { ...data, user };
}

export async function Header() {
  const { data, user } = await loader();
  if (!data) throw new Error("No data found");

  const { logoLink, foodCategories } = data;
  const logoImage = logoLink?.logoImage?.url;

  return (
    <div className="sticky top-0 z-50 shadow-sm bg-white">
      <div className="flex items-center justify-between gap-8 px-4 py-4 container mx-auto">
        <Link
          href={logoLink?.href || "/"}
          className="flex items-center gap-2 h-10"
        >
          <StrapiImage
            src={logoImage}
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <h1 className="hidden md:block text-xl text-primary">Next Store</h1>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-2 flex-1">
          <ItemsDropdown
            label={foodCategories.label}
            items={foodCategories.categories}
          />
        </div>

        {user.ok ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <CartModal>
                <CartButton />
                <CartItems>
                  <Button asChild>
                    <a href="/order">Start Checkout</a>
                  </Button>
                </CartItems>
              </CartModal>
            </div>

            <LogoutButton />
          </div>
        ) : (
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
