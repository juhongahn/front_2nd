import Component from "./core/Component";
import CartItems from "./components/CartItems";

const P1_DISCOUNT_RATIO = 0.1;
const P2_DISCOUNT_RATIO = 0.15;
const P3_DISCOUNT_RATIO = 0.2;
const QUANTITY_DISCOUNT_RATIO = 0.3;

const DISCOUNT_QUANTITY = 30;

const PRODUCT_LIST = [
  { id: "p1", name: "상품1", price: 10000 },
  { id: "p2", name: "상품2", price: 20000 },
  { id: "p3", name: "상품3", price: 30000 },
];

let SELECTED_OPTION = "p1";

export default class App extends Component {
  setup() {
    this.state = {
      cartItems: [],
    };
  }
  template() {
    const { cartItems } = this.state;

    const totalDiscountRatio = cartItems.reduce(
      (totalDiscountRatio, currentItem) => {
        if (currentItem.count > 9) {
          if (currentItem.id === "p1") totalDiscountRatio = 0.1;
          else if (currentItem.id === "p2") totalDiscountRatio = 0.15;
          else if (currentItem.id === "p3") totalDiscountRatio = 0.2;
        }
        return totalDiscountRatio;
      },
      0,
    );
    const totalPrice = cartItems.reduce((totalPrice, currentItem) => {
      return totalPrice + currentItem.count * currentItem.price;
    }, 0);
    const totalDiscountPrice = totalPrice * (1 - totalDiscountRatio);

    return `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items" data-component="cart-items">
      </div>
      <div id="cart-total" class="text-xl font-bold my-4">
        총액: ${totalDiscountPrice}원 ${totalDiscountRatio !== 0 ? `(${totalDiscountRatio * 100}% 할인 적용)` : ""}
      </div>
      <select id="product-select" class="border rounded p-2 mr-2">
        ${PRODUCT_LIST.map((product) => {
          return `<option ${SELECTED_OPTION === product.id ? "selected" : ""} value="${product.id}">${product.name} - ${product.price}원</option>`;
        }).join("")}
      </select>
      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    </div>
    `;
  }
  mounted() {
    const { cartItems } = this.state;
    const cartItemComponent = this.root.querySelector(
      '[data-component="cart-items"]',
    );

    new CartItems(cartItemComponent, {
      cartItems,
      deleteItem: deleteItem.bind(this),
      increaseCounter: increaseCounter.bind(this),
      decreaseCounter: decreaseCounter.bind(this),
    });

    function deleteItem(itemId) {
      const items = [...this.state.cartItems];
      const filteredItems = items.filter((item) => item.id !== itemId);
      this.setState({ cartItems: filteredItems });
    }

    function increaseCounter(itemId) {
      const items = [...this.state.cartItems];
      const filteredItems = items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            count: item.count + 1,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      this.setState({ cartItems: filteredItems });
    }

    function decreaseCounter(itemId) {
      const items = [...this.state.cartItems];
      const filteredItems = items
        .map((item) => {
          if (item.id === itemId) {
            if (item.count === 1) return null;
            return {
              ...item,
              count: item.count - 1,
            };
          } else {
            return {
              ...item,
            };
          }
        })
        .filter((item) => item !== null);
      this.setState({ cartItems: filteredItems });
    }
  }
  setEvent() {
    this.addEvent("click", "#add-to-cart", ({ target }) => {
      const productSelectElement = document.getElementById("product-select");
      const selectedProduct = PRODUCT_LIST.find(
        ({ id }) => id === productSelectElement.value,
      );
      SELECTED_OPTION = selectedProduct.id;
      const { cartItems } = this.state;
      const needle = cartItems.find(
        (item) => item.id === productSelectElement.value,
      );
      if (!needle) {
        this.setState({
          cartItems: [...cartItems, { ...selectedProduct, count: 1 }],
        });
      } else {
        const newCartItems = cartItems.map((item) => {
          if (item.id === productSelectElement.value) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
        });
        this.setState({
          cartItems: newCartItems,
        });
      }
    });
  }
}
