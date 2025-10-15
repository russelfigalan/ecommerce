import { CategoryList } from "./_components/category-list";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CategoryList />
      {children}
    </>
  );
}
