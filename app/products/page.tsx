
export const getProducts = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products');

  if (!res.ok) {
    throw new Error('Could not retrieve data.')
  }
  return res.json();
}

export default async function Products() {
  return (
    <>
        <h1>Products</h1>
    </>
  )

}
