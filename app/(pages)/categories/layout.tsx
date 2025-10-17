import { CategoryList } from "./_components/category-list";
import { BreadCrumb } from "./_components/breadcrumbs";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CategoryList />
      <BreadCrumb />
      {children}
    </>
  );
}
