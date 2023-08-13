import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import LoginDrawer from "./LoginDrawer";
import { navigation } from "@/constants";

function classNames(...classes: string[]) {
  return classes?.filter(Boolean)?.join(" ");
}

const ProfileDropdown = () => {
  const userr = false;
  return (
    <div className="md:ml-4 ml-2 flex items-center">
      {userr ? (
        <Menu as="div" className="relative flex-shrink-0">
          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
            <img
              className="h-8 w-8 rounded-full"
              src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtd9M6KBOGZjnk94PFAEIGX-t7nDfWROVK17Mm8-ZMI%3Ds96-c&w=48&q=75"
              alt=""
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigation.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link href={item.href} className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 lg:hidden inline-flex w-full")}>
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Button className="px-4 py-2 text-sm text-gray-700 inline-flex w-full hover:bg-gray-100">
                    SIGN OUT
              </Menu.Button>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <LoginDrawer />
      )}
    </div>
  );
};

export default ProfileDropdown;