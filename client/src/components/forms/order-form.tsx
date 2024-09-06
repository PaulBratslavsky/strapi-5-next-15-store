"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/custom/submit-button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ZodErrors } from "@/components/custom/zod-errors";
import { createOrderAction } from "@/data/actions";
import { useFormState } from "react-dom";
import { StrapiErrors } from "@/components/custom/strapi-errors";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"



const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: {
    firstName: "",
    lastName: "",
    streetAddress: "",
    state: "",
    zip: "",
    phone: "",
  },
  message: null,
};

export function OrderForm() {
  const { toast } = useToast(); 
  const router = useRouter();

  const [formState, formAction] = useFormState(
    createOrderAction,
    INITIAL_STATE
  );

  const { firstName, lastName, streetAddress, state, zip, phone } = formState?.data || {};


  useEffect(() => {
    if (formState?.message === "Order submitted") {
      toast({
        title: "Order submitted",
        description: formState.message,
      });
      router.push("/");
    }
  }, [formState?.message, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" defaultValue={firstName}/>
              <ZodErrors error={formState?.zodErrors?.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" defaultValue={lastName}/>
              <ZodErrors error={formState?.zodErrors?.lastName} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input id="streetAddress" name="streetAddress" defaultValue={streetAddress}/>
            <ZodErrors error={formState?.zodErrors?.streetAddress} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" defaultValue={state}/>
              <ZodErrors error={formState?.zodErrors?.state} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" name="zip" defaultValue={zip}/>
              <ZodErrors error={formState?.zodErrors?.zip} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={phone}/>
            <ZodErrors error={formState?.zodErrors?.phone} />
          </div>
          <SubmitButton text="Submit Order" loadingText="Processing..." />
          <StrapiErrors error={formState?.strapiErrors} />
        </form>
      </CardContent>
    </Card>
  );
}
