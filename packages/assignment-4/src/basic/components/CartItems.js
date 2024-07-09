import Component from "../core/Component";

export default class CartItems extends Component {
  template() {
    const { cartItems } = this.props;
    return `
        ${cartItems
          .map(({ id, name, price, count }) => {
            return `
            <div id="${id}" class="flex justify-between items-center mb-2">
              <span>${name} - ${price}원 x ${count}</span>
              <div>
                <button class="decrease-item quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
                <button class="increase-item quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
                <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
              </div>
            </div>
          `;
          })
          .join("")}
    `;
  }
  setEvent() {
    this.addEvent("click", ".remove-item", ({ target }) => {
      const { deleteItem } = this.props;
      deleteItem(target.closest("[data-product-id]").dataset.productId);
    });

    this.addEvent("click", ".increase-item", ({ target }) => {
      const { increaseCounter } = this.props;
      increaseCounter(target.closest("[data-product-id]").dataset.productId);
    });

    this.addEvent("click", ".decrease-item", ({ target }) => {
      const { decreaseCounter } = this.props;
      decreaseCounter(target.closest("[data-product-id]").dataset.productId);
    });
  }
}
