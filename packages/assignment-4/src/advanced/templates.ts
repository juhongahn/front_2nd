import { Product, CartItem } from "./product";

export const ProductOption = (products: Product[]) => {
  return `${products.map((product) => {
    `<option value="${product.id}">${product.name + " - " + product.price + "원"}</option>`;
  })}`;
};

export const MainLayout = () => `
  <div class="bg-gray-100 p-8">
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"
    >
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      <div id="cart-items"></div>
      <div id="cart-total" class="text-xl font-bold my-4"></div>
      <select
        id="product-select"
        class="border rounded p-2 mr-2"
      ></select>
      <button
        id="add-to-cart"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        추가
      </button>
    </div>
  </div>`;

export const CartItem = (cartItem: CartItem) => {
  return `
    <div id="${cartItem.product.id}" class="flex justify-between items-center mb-2">
      <span>${cartItem.product.name + " - " + cartItem.product.price + "원 x 1"}</span>
      <div>
        <button
          class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id="${cartItem.product.id}"
          data-change="-1"
        >
          -
        </button>
        <button
          class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id="${cartItem.product.id}"
          data-change="1"
        >
          +
        </button>
        <button
          class="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id="${cartItem.product.id}"
        >
          삭제
        </button>
      </div>
    </div>
  `;
};

export const CartTotal = () => ``;
