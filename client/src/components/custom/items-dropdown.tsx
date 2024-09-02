"use client";

import { Button } from "@/components/ui/button";
import { LayoutGridIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StrapiImage } from "@/components/custom/strapi-image";

interface StrapiImageProps {
  url: string;
  alternativeText: string;
}

interface ItemDropdownProps {
  label: string;
  items: {
    title: string;
    slug: string;
    documentId: string;
    image: StrapiImageProps;
  }[];
}

export function ItemsDropdown({
  label,
  items = [],
}: Readonly<ItemDropdownProps>) {
  
  const handleClick = (documentId: string) => {
    alert("clicked" + documentId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 items-center border rounded-full p-2 px-10"
        >
          <span className="font-bold">
            <LayoutGridIcon className="w-4 h-4" />
          </span>
          <span className="font-light">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleClick(item.documentId)}
            >
              <div className="flex items-center gap-2">
                <StrapiImage
                  src={item.image.url}
                  alt={item.title}
                  width={20}
                  height={20}
                />
                <span>{item.title}</span>
              </div>
              
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
