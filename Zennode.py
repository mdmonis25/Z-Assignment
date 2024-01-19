def calculate_discount(cart_total, product_quantity, products):
    flat_10_discount = 0
    bulk_5_discount = 0
    bulk_10_discount = 0
    tiered_50_discount = 0
    total_quantity = sum(product_quantity.values())

    # "flat_10_discount": If cart total exceeds $200, apply a flat $10 discount on the cart total.
    if cart_total > 200:
        flat_10_discount = 10

    # "bulk_5_discount": If the quantity of any single product exceeds 10 units, apply a 5% discount on that item's total price.
    for product, quantity in product_quantity.items():
        if quantity > 10:
            bulk_5_discount += quantity * 0.05 * products[product]

    # "bulk_10_discount": If total quantity exceeds 20 units, apply a 10% discount on the cart total.
    if total_quantity > 20:
        bulk_10_discount = cart_total * 0.1  # Apply 10% discount to the entire cart total

    # "tiered_50_discount": If total quantity exceeds 30 units & any single product quantity greater than 15, then apply a 50% discount on products which are above  15 quantity.
    for product, quantity in product_quantity.items():
        if quantity > 15 and total_quantity > 30:
            tiered_50_discount += (quantity - 15) * 0.5 * products[product]

    discount_options = {
        "flat_10_discount": flat_10_discount,
        "bulk_5_discount": bulk_5_discount,
        "bulk_10_discount": bulk_10_discount,
        "tiered_50_discount": tiered_50_discount,
    }

    max_discount_rule = max(discount_options, key=discount_options.get)
    max_discount_amount = discount_options[max_discount_rule]

    return max_discount_rule, max_discount_amount


products = {
    "A": 20,
    "B": 40,
    "C": 50,
}

product_quantity = {}
wrap_fee = 1
ship_fee = 5
items_per_package = 10

# Collecting user input for product quantities and gift wrapping
for product, price in products.items():
    quantity = int(input(f"Enter quantity for product {product}: "))
    is_gift_wrapped = input(f"Is {product} wrapped as a gift? (yes/no): ").lower() == "yes"
    product_quantity[product] = quantity

    total_amount = quantity * price
    wrap_fee_total = quantity * wrap_fee if is_gift_wrapped else 0

    print(f"\n{product} - Quantity: {quantity}, Total Amount: ${total_amount}")
    print(f"Gift Wrap Fee: ${wrap_fee_total}")

# Calculating subtotal
subtotal = sum(quantity * products[product] for product, quantity in product_quantity.items())

total_quantity = sum(product_quantity.values())

# Calculating discounts
discount_rule, discount_amount = calculate_discount(subtotal, product_quantity, products)
total_discounted = subtotal - discount_amount

# Calculating shipping fee
ship_fee_total = (total_quantity // items_per_package) * ship_fee

# Calculating total
total = total_discounted + ship_fee_total

# Display order summary
print("\nOrder Summary:")
for product, quantity in product_quantity.items():
    print(f"{product} - Quantity: {quantity}, Total Amount: ${quantity * products[product]}")

print(f"\nYour Bill: ${subtotal}")
print(f"Discount Applied ({discount_rule}): ${discount_amount}")
print(f"Shipping Fee: ${ship_fee_total}")
print(f"\nTotal Price: ${total}")
