class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    const specialFullCoverageSteps = {
      secondDecrease: 10,
      thirdDecrease: 5
    }

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      const isValid = product.isValid();
      const productName = product.getName();

      // Legendary product - Should not be updated
      if (productName === 'Mega Coverage') {
        continue;
      }

      switch (productName) {
        case 'Full Coverage':
          // this product always increase the price
          product.increasePrice();
          break;

        case 'Special Full Coverage':
          // if the sellIn is less than zero price should be zero
          if (!isValid) {
            product.setPrice(0);
            break;
          }
          let amount = 1;
          if (product.getSellIn() <= specialFullCoverageSteps.secondDecrease) {
            amount++;
          }
          if (product.getSellIn() <= specialFullCoverageSteps.thirdDecrease) {
            amount++;
          }
          product.increasePrice(amount);
          break;

        case 'Super Sale':
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
  CarInsurance,
};
