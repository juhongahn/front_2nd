export const createShoppingCart = () => {
  const items = {};

  const addItem = () => {};

  const removeItem = () => {};

  const updateQuantity = () => {};

  const getItems = () => [];

  const calculateDiscount = () => {
    let discount = 0;
    let discountRatio = 0;

    if (cartTotalQuantity >= BULK_DISCOUNT_QUANTITY) {
      let bulkDiscount = cartTotalPrice * BULK_DISCOUNT_RATIO;
      let individualDiscount = cartNoDiscountPrice - cartTotalPrice;

      if (bulkDiscount > individualDiscount) {
        cartTotalPrice = cartNoDiscountPrice * (1 - BULK_DISCOUNT_RATIO);
        discountRatio = BULK_DISCOUNT_RATIO;
      } else {
        discountRatio =
          (cartNoDiscountPrice - cartTotalPrice) / cartNoDiscountPrice;
      }
    } else {
      discountRatio =
        (cartNoDiscountPrice - cartTotalPrice) / cartNoDiscountPrice;
    }
    

    return 0;
  };


  const getTotalQuantity = () => 0;

  const getTotal = () => ({
    total: 0,
    discountRate: 0
  });

  return { addItem, removeItem, updateQuantity, getItems, getTotal };
};
