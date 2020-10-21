class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  maxPrice = 50;
  minPrice = 0;
  degrade = 1;

  increasePrice(value = this.degrade) {
    var amount = this.calculateAmount(value);
    this.price =
      this.price + amount <= this.maxPrice
        ? this.price + amount
        : this.maxPrice;
  }

  decreasePrice(value = this.degrade) {
    var amount = this.calculateAmount(value);
    this.price =
      this.price - amount <= this.minPrice
        ? this.minPrice
        : this.price - amount;
  }

  calculateAmount(value) {
    return this.isValid() ? value : value * 2;
  }

  decreaseSellIn() {
    this.sellIn--;
  }

  isValid() {
    return this.sellIn > 0;
  }

  setPrice(value) {
    this.price = value;
  }

  getName() {
    return this.name;
  }

  getSellIn() {
    return this.sellIn;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    for (var i = 0; i < this.products.length; i++) {
      var product = this.products[i];
      var isValid = product.isValid();
      var productName = product.getName();

      // Legendary product - Should not be updated
      if (productName === "Mega Coverage") {
        continue;
      }

      switch (productName) {
        case "Full Coverage":
          // this product always increase the price
          product.increasePrice();
          break;

        case "Special Full Coverage":
          // if the sellIn is less than zero price should be zero
          if (!isValid) {
            product.setPrice(0);
            break;
          }
          var amount = 1;
          if (product.getSellIn() <= 10) {
            amount++;
          }
          if (product.getSellIn() <= 5) {
            amount++;
          }
          product.increasePrice(amount);
          break;

        case "Super Sale":
          // decrease twice faster as normal product
          product.decreasePrice(product.degrade * 2);
          break;

        default:
          product.decreasePrice();
          break;
      }
      product.decreaseSellIn();
    }
    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance,
};
