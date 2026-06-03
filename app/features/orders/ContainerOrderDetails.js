"use client";

import useOrderItemsId from "./useOrderItemsId";
import useProducts from "./useProducts";

export default function ContainerOrderDetails({ orderId }) {
  const { orderItems, isLoading: loadingItems } = useOrderItemsId(orderId);
  const { products, isLoading: loadingProducts } = useProducts();

  if (loadingItems || loadingProducts) {
    return <p>Loading...</p>;
  }

  const orderItemsIds = orderItems?.map((item) => item.product_id) || [];

  const orderProducts =
    products?.filter((item) =>
      orderItemsIds.includes(item.id)
    ) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Products</h2>

      {orderProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        orderProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.brand}</p>

            <img
              src={product.main_image}
              alt={product.name}
              style={{ width: "120px" }}
            />
          </div>
        ))
      )}
    </div>
  );
}