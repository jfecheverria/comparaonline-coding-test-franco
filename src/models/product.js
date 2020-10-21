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
    const amount = this.calculateAmount(value);
    const maxPriceReached = this.price + amount <= this.maxPrice;
    this.price = maxPriceReached ? this.price + amount : this.maxPrice;
  }

  decreasePrice(value = this.degrade) {
    const amount = this.calculateAmount(value);
    const minPriceReached = this.price - amount <= this.minPrice;
    this.price = minPriceReached ? this.minPrice : this.price - amount;
  }

  calculateAmount(value) {
    // if is not valid duplicates the decrease amount
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

  getPrice() {
    return this.price;
  }

  getSellIn() {
    return this.sellIn;
  }
}

module.exports = {
  Product,
};