export interface Product {
  id?: number;
  product: string;
  price: string;
}

export default async function Home() {
  const res = await fetch(
    "https://65327c0fd80bd20280f59ea5.mockapi.io/api/v1/products",
    {
      cache: "no-cache",
    }
  );

  const products: Product[] = await res.json();

  const addProductToDatabase = async (e: FormData) => {
    "use server";
    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();

    if (!product || !price) return;

    const newProduct: Product = {
      product,
      price,
    };

    await fetch("https://65327c0fd80bd20280f59ea5.mockapi.io/api/v1/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <form
        action={addProductToDatabase}
        className="flex flex-col gap-5 max-w-xl mx-auto p-5"
      >
        <input
          name="product"
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Enter Product Name..."
        />
        <input
          name="price"
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Enter Price Name..."
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>

      <h2 className="font_bold p-5">List of Products</h2>
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 p-5 rounded-md"
          >
            <h3 className="font-bold">{product.product}</h3>
            <p>{product.price} $</p>
          </div>
        ))}
      </div>
    </main>
  );
}
