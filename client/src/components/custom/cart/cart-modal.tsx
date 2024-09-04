"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CartModalProps {
  children: [React.ReactNode, React.ReactNode ];
} 

export function CartModal({ children }: CartModalProps) {
  const [triggerComponent, contentComponent ] = React.Children.toArray(children);  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        {contentComponent}
      </DialogContent>
    </Dialog>
  );
}
