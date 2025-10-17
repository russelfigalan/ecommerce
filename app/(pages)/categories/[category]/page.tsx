interface Props {
  params: Promise<{
    category: string;
  }>;
}

const CategorySection = async ({ params }: Props) => {
  const { category } = await params;

  return (
    <>
      <h1 className="capitalize">Category: {decodeURIComponent(category)}</h1>
    </>
  );
};

export default CategorySection;
