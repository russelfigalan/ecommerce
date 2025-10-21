"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadCrumb() {
  const pathname = usePathname();
  const breadcrumbspath = pathname
    ?.split("/")
    .filter((segment) => segment !== "");
  const [lastItem, setLastItem] = useState<boolean>(false);

  useEffect(() => {
    breadcrumbspath.map((_, index, array) => {
      if (index === array.length - 1) {
        setLastItem(true);
      }
    });
  }, [lastItem, breadcrumbspath]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbspath.map((data, index) => {
            const href = `/${breadcrumbspath[0]}/${decodeURIComponent(data)}`;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem key={index} className="capitalize">
                  {index === breadcrumbspath.length - 1 ? (
                    <BreadcrumbPage>{decodeURIComponent(data)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink key={index} asChild>
                      <Link key={index} href={href}>
                        {decodeURIComponent(data)}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index === breadcrumbspath.length - 1 ? null : (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
