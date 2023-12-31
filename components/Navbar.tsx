"use client";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { navigation } from "@/constants";
import Cart from "./Cart";
import ProfileDropdown from "./ProfileDropdown";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Searchbar from "./Searchbar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [cartData, loading] = useCollectionData(
    collection(db, `users/${user?.uid}/cart`)
  );

  const cartLength = cartData?.length || 0;
  return (
    <div className="bg-white sticky top-0 left-0 right-0 z-20">
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-[#111] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Order Online, Pick Up In-Store!
        </p>
        <nav className="mx-auto max-w-6xl px-4">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <Link
                className="text-black-900 text-lg italic whitespace-nowrap"
                href="/"
              >
                Navkar
              </Link>
              {/* Navlinks menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <div className="relative flex">
                          <Link
                            href={category.href}
                            className={classNames(
                              open
                                ? "border-indigo-600 text-indigo-600 outline-none whitespace-nowrap"
                                : "border-transparent text-gray-700 hover:text-gray-800",
                              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none whitespace-nowrap"
                            )}
                          >
                            {category.name}
                          </Link>
                        </div>
                      )}
                    </Popover>
                  ))}
                  <Popover className="flex">
                    {({ open }) => (
                      <div className="relative flex">
                        <Link
                          href={`/myOrders?uid=${user?.uid}`}
                          className={classNames(
                            open
                              ? "border-indigo-600 text-indigo-600 outline-none"
                              : "border-transparent text-gray-700 hover:text-gray-800 whitespace-nowrap",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none whitespace-nowrap"
                          )}
                        >
                          MY ORDERS
                        </Link>
                      </div>
                    )}
                  </Popover>
                </div>
              </Popover.Group>
              {/* Profile Dropdown and ShoppingCart Button */}
              <div className="ml-auto flex items-center space-x-3">
                <ProfileDropdown />
                <div className="group relative">
                  <ShoppingBagIcon
                    onClick={() => {
                      setCartOpen(true);
                    }}
                    className="flex-shrink-0 outline-none text-gray-400 group-hover:text-gray-500 h-7 w-7 cursor-pointer"
                    aria-hidden="true"
                  />
                  <span className="absolute animate-pulse top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    {cartLength}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Cart */}
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </div>
  );
};

export default Navbar;