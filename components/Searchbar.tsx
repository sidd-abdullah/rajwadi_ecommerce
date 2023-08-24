'use client'

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const Searchbar = () => {
    const [search, setsearch] = useState("");
    const router = useRouter();

    const handelSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!search || !search?.trim()) return;
        router.push(`/results?search_query=${search}`);
    };

    // Trigger the search when the Enter key is pressed
    const handleKeyDown = (e: any) => {
        if (e.code === "Enter" || e.keyCode === 13) {
            handelSearch(e);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-2 py-4">
            <div className="max-w-xl w-full">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
                        <MagnifyingGlassIcon
                            onClick={handelSearch}
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="Search products..."
                    />
                    {search && (
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => setsearch("")}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Searchbar