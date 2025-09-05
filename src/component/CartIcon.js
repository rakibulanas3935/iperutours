"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/context/cartContext";


export default function CartIcon() {
 const {cartItem}=useCartContext()
 console.log(cartItem)
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart
        size={22}
        className={
           "text-brand-secondary" 
        }
      />
      {cartItem?.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent-yellow text-xs text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItem?.length}
        </span>
      )}
    </Link>
  );
}
