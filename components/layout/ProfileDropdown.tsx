"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import GoogleTranslate from "next-google-translate-widget";
import "next-google-translate-widget/styles";
import OrderItemCount from "../shared/OrderItemCount";

const myLanguages = [
  { label: "English", value: "en", flag: "us" },
  { label: "नेपाली", value: "ne", flag: "np" },
];

interface LinkItem {
  type: "link";
  name: string;
  href: string;
}

interface TranslateItem {
  type: "translate";
}

type MenuItem = LinkItem | TranslateItem;

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const dropDownMenu: MenuCategory[] = [
  {
    category: "Personal",
    items: [
      {
        type: "link",
        name: "Know Yourself's Result",
        href: "/personality-test/comparison",
      },
    ],
  },
  {
    category: "Order",
    items: [
      {
        type: "link",
        name: "My Order",
        href: "/cart",
      },
    ],
  },
  {
    category: "Preference",
    items: [
      {
        type: "translate",
      },
    ],
  },
];

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile/Tablet Side Menu (Drawer) */}
      <div className="xl:hidden">
        {/* Backdrop Overlay */}
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-zinc-950/45 backdrop-blur-xs z-60 animate-fade-in"
          onClick={onClose}
        />
        {/* Side Menu Panel */}
        <div className="fixed top-0 left-0 bottom-0 z-60 w-72 md:w-[50vw] h-screen bg-white p-4 shadow-2xl animate-slide-in-left flex flex-col gap-5 text-left border-r border-zinc-200">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
            <span className="text-lg font-bold text-zinc-900">
              Account Options
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              aria-label="Close side menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Menu Items */}
          <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-5">
            {dropDownMenu.map((group, index) => (
              <div key={group.category} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider px-2 select-none">
                  {group.category}
                </span>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    if (item.type === "translate") {
                      return (
                        <div key="translate-widget" className="mt-1 px-1">
                          <GoogleTranslate
                            pageLanguage="en"
                            languages={myLanguages}
                            menuAlign="left"
                            className="w-full [&>button]:w-full [&>button]:justify-between [&>button]:py-3! [&>button]:px-4! [&>button]:text-base! [&>button]:font-medium! [&>button]:text-zinc-700! [&>button]:hover:bg-zinc-50! [&>button]:border [&>button]:border-zinc-200 [&>button]:rounded-xl [&>div]:w-full"
                          />
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href || "#"}
                        onClick={onClose}
                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors w-full"
                      >
                        <span>{item.name}</span>
                        {item.href === "/cart" && (
                          <OrderItemCount className="px-1.5 font-extrabold shadow-xs" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Dropdown Menu */}
      <div className="hidden xl:flex absolute right-0 top-14 z-50 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl animate-fade-in flex flex-col gap-1.5 text-left">
        {dropDownMenu.map((group, index) => (
          <div
            key={group.category}
            className={`${index > 0 ? "border-t border-zinc-100 pt-1.5" : ""} px-1`}
          >
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider px-3 py-1 block select-none">
              {group.category}
            </span>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                if (item.type === "translate") {
                  return (
                    <div key="translate-widget" className="mt-1">
                      <GoogleTranslate
                        pageLanguage="en"
                        languages={myLanguages}
                        menuAlign="right"
                        className="w-full [&>button]:w-full [&>button]:justify-between [&>button]:py-2! [&>button]:px-3! [&>button]:text-sm! [&>button]:font-medium! [&>button]:text-zinc-700! [&>button]:hover:bg-zinc-50! [&>button]:border-0 [&>button]:rounded-xl [&>div]:w-full"
                      />
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href || "#"}
                    onClick={onClose}
                    className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors w-full"
                  >
                    <span>{item.name}</span>
                    {item.href === "/cart" && (
                      <OrderItemCount className="px-1.5 font-extrabold shadow-xs" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
