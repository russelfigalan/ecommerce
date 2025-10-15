"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

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
            const href = `/${data}`;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem key={index} className="capitalize">
                  {index === breadcrumbspath.length - 1 ? (
                    <BreadcrumbPage>{data.replaceAll("-", " ")}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink key={index} asChild>
                      <Link key={index} href={href}>
                        <BreadcrumbEllipsis>
                          {data.replaceAll("-", " ")}
                        </BreadcrumbEllipsis>
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
