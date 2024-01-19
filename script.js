function calculateDiscount(cartTotal, productQuantity,products) {
  let flat10Discount=0;
  let bulk5Discount = 0;
  let bulk10Discount = 0;
  let tiered50Discount = 0;
  const totalQuantity = Object.values(productQuantity).reduce((acc, quantity) => acc + quantity, 0);
  
  // "flat_10_discount": If cart total exceeds $200, apply a flat $10 discount on the cart total.
  if (cartTotal > 200) {
      flat10Discount = 10;
  }

  // "bulk_5_discount": If the quantity of any single product exceeds 10 units, apply a 5% discount on that item's total price.
  for (const [product, quantity] of Object.entries(productQuantity)) {
      if (quantity > 10) {
          bulk5Discount += quantity * 0.05 * products[product];
      }
  }

  // "bulk_10_discount": If total quantity exceeds 20 units, apply a 10% discount on the cart total.
  if (totalQuantity > 20) {
      bulk10Discount = cartTotal * 0.1;
  }

  // "tiered_50_discount": If total quantity exceeds 30 units & any single product quantity greater than 15, then apply a 50% discount on products which are above  15 quantity. The first 15 quantities have the original price and units above 15 will get a 50% discount.
  for (const [product, quantity] of Object.entries(productQuantity)) {
    if (quantity > 15 && totalQuantity > 30) {
        tiered50Discount += (quantity - 15) * 0.5 * products[product];
    }
}

  const discountOptions = {
      flat_10_discount: flat10Discount,
      bulk_5_discount: bulk5Discount,
      bulk_10_discount: bulk10Discount,
      tiered_50_discount: tiered50Discount,
  };

  let maxDiscountRule;
  let maxDiscountAmount = 0;
  // calculating the best discount
  for (const rule in discountOptions) {
      if (discountOptions[rule] > maxDiscountAmount) {
          maxDiscountRule = rule;
          maxDiscountAmount = discountOptions[rule];
      }
  }

  return [maxDiscountRule, maxDiscountAmount];
}

function main() {
  const products = {
      "A": 20,
      "B": 40,
      "C": 50,
  };

  const productQuantity = {};
  const wrapFee = 1;
  const shipFee = 5;
  const itemsPerPackage = 10;

  // Collecting user input for product quantities and gift wrapping
  for (const [product, price] of Object.entries(products)) {
      const quantity = parseInt(prompt(`Enter quantity for product (Number Only) ${product}:`));
      const isGiftWrapped = prompt(`Is ${product} wrapped as a gift? (yes/no):`).toLowerCase() === "yes";
      productQuantity[product] = quantity;

      const totalAmount = quantity * price;
      const wrapFeeTotal = isGiftWrapped ? quantity * wrapFee : 0;

      console.log(`\n${product} - Quantity: ${quantity}, Total Amount: $${totalAmount}`);
      console.log(`Gift Wrap Fee: $${wrapFeeTotal}`);
  }

  // Calculating subtotal (Original Price)
  let subtotal = 0;
  for (const [product, quantity] of Object.entries(productQuantity)) {
      subtotal += quantity * products[product];
  }
  
  const totalQuantity = Object.values(productQuantity).reduce((acc, quantity) => acc + quantity, 0);
  // Calculating discounts
  const [discountRule, discountAmount] = calculateDiscount(subtotal, productQuantity,products);
  const totalDiscounted = subtotal - discountAmount;
  // Calculating shipping fee
  const shipFeeTotal = Math.floor(totalQuantity / itemsPerPackage) * shipFee;

  // Calculating total (Discounted Price)
  const total = totalDiscounted + shipFeeTotal;

  // Display order summary
  console.log("\nOrder Summary:");
  for (const [product, quantity] of Object.entries(productQuantity)) {
      console.log(`${product} - Quantity: ${quantity}, Total Amount: $${quantity * products[product]}`);
  }

  console.log(`\nYour Bill: $${subtotal}`);
  console.log(`Discount Applied (${discountRule}): $${discountAmount}`);
  console.log(`Shipping Fee: $${shipFeeTotal}`);
  console.log(`\nTotal Price: $${total}`);
}

main();
