"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import React from "react";

const categories = [
  {
    title: "Fashion",
    data: [
      {
        name: "Men's Clothing",
        slug: "mens",
      },
      {
        name: "Women's Clothing",
        slug: "womens",
      },
      {
        name: "Slippers",
        slug: "slippers",
      },
      {
        name: "Shoes",
        slug: "shoes",
      },
    ],
  },
  {
    title: "Electronics",
    data: [
      {
        name: "Entertainment",
        slug: "entertainment",
      },
      {
        name: "Computers and Gadgets",
        slug: "computers-gadgets",
      },
      {
        name: "Home Appliance",
        slug: "appliance",
      },
    ],
  },
  {
    title: "Furnitures",
    data: [
      {
        name: "Living Room",
        slug: "living-room",
      },
      {
        name: "Bedroom",
        slug: "bedroom",
      },
      {
        name: "Home Office",
        slug: "home-office",
      },
      {
        name: "Dining Room",
        slug: "dining-room",
      },
      {
        name: "Outdoor",
        slug: "outdoor",
      },
    ],
  },
  {
    title: "Kitchen and Dining",
    data: [
      {
        name: "Cookware and Bakeware",
        slug: "cooking-baking",
      },
      {
        name: "Kitchen Tool and Gadgets",
        slug: "kitchen-tools",
      },
      {
        name: "Dining and Serving",
        slug: "dining-serving",
      },
      {
        name: "Cleaning and Maintenance",
        slug: "cleaning-maintenance",
      },
    ],
  },
];

export const CategoryList = () => {
  const categoryTitle = categories.map((value, index) => {
    if (categories[index] == value) {
      return value;
    }
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  href={`/categories/${categoryTitle[0]?.title.toLowerCase()}`}
                >
                  {categoryTitle[0]?.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="whitespace-nowrap">
                  {categoryTitle[0]?.data.map((data) => {
                    const name = data.name;
                    const slug = data.slug;
                    return (
                      <React.Fragment key={name}>
                        <li key={name}>
                          <NavigationMenuLink asChild>
                            <Link
                              key={name}
                              href={`/categories/${categoryTitle[0]?.title.toLowerCase().replaceAll(" ", "-")}/${slug}`}
                            >
                              {name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  href={`/categories/${categoryTitle[1]?.title.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {categoryTitle[1]?.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="whitespace-nowrap">
                  {categoryTitle[1]?.data.map((data) => {
                    const name = data.name;
                    const slug = data.slug;
                    return (
                      <React.Fragment key={name}>
                        <li key={name}>
                          <NavigationMenuLink asChild>
                            <Link
                              key={name}
                              href={`/categories/${categoryTitle[1]?.title.toLowerCase().replaceAll(" ", "-")}/${slug}`}
                            >
                              {name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  href={`/categories/${categoryTitle[2]?.title.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {categoryTitle[2]?.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="whitespace-nowrap">
                  {categoryTitle[2]?.data.map((data) => {
                    const name = data.name;
                    const slug = data.slug;
                    return (
                      <React.Fragment key={name}>
                        <li key={name}>
                          <NavigationMenuLink asChild>
                            <Link
                              key={name}
                              href={`/categories/${categoryTitle[2]?.title.toLowerCase().replaceAll(" ", "-")}/${slug}`}
                            >
                              {name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  href={`/categories/${categoryTitle[3]?.title.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {categoryTitle[3]?.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="whitespace-nowrap">
                  {categoryTitle[3]?.data.map((data) => {
                    const name = data.name;
                    const slug = data.slug;
                    return (
                      <React.Fragment key={name}>
                        <li key={name}>
                          <NavigationMenuLink asChild>
                            <Link
                              key={name}
                              href={`/categories/${categoryTitle[3]?.title.toLowerCase().replaceAll(" ", "-")}/${slug}`}
                            >
                              {name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};
