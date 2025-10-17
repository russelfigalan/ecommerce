// import { BreadCrumb } from "../../_components/breadcrumbs";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubCategorySection = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  return (
    <>
      {/* <BreadCrumb /> */}
      <h1 className="capitalize">
        Category: {decodeURIComponent(category.replaceAll("-", " "))}
        {" / "}
        {decodeURIComponent(subcategory.replaceAll("-", " "))}
      </h1>
    </>
  );
};

export default SubCategorySection;
