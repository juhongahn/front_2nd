export class CartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  function increaseCartItem() {
    this.quantity += 1;
  }
  function decreaseCartItem() {
    this.quantity -= 1;
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
