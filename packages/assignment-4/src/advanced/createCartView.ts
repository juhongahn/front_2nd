import { MainLayout, ProductOption } from "./templates";

const addHTMLToParent = (
  literalHtml: string,
  parentElement: HTMLElement | null,
) => {
  if (!(parentElement instanceof HTMLElement))
    throw Error("parentElement is not HTMLElement");

  const childFragment = document
    .createRange()
    .createContextualFragment(literalHtml);
  parentElement.appendChild(childFragment);
};

export const createCartView = () => {
  const mainLiteralHtml = MainLayout();
  const $app = document.getElementById("app");
  addHTMLToParent(mainLiteralHtml, $app);

  const $cartSelectElement = document.getElementById("product-select");
  const products = [
    { id: "p1", name: "상품1", price: 10000 },
    { id: "p2", name: "상품2", price: 20000 },
    { id: "p3", name: "상품3", price: 30000 },
  ];
  const literalProductOptions = ProductOption(products);
  addHTMLToParent(literalProductOptions, $cartSelectElement);
};
