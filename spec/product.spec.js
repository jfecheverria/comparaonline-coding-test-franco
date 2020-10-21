const expect = require('chai').expect;
const Models = require('../src/models/index');
const Product = Models.Product;

describe('CO Product Class Test - getters and setters', function () {
  beforeEach(function () {
    product = new Product('Medium Coverage', 10, 20);
  });
  it('Product properties are assigned correctly in the constructor', function () {
    expect(product.name).equal('Medium Coverage');
    expect(product.sellIn).equal(10);
    expect(product.price).equal(20);
  });

  it('Product getName function retrieves the right property', function () {
    expect(product.getName()).equal('Medium Coverage');
  });

  it('Product getPrice function retrieves the right property', function () {
    expect(product.getPrice()).equal(20);
  });

  it('Product getSellIn function retrieves the right property', function () {
    expect(product.getSellIn()).equal(10);
  });

  it('Product isValid - sellIn valid', function () {
    const valid = product.isValid();
    expect(valid).equal(true);
  });

  it('Product isValid - sellIn invalid', function () {
    product.sellIn = -5;
    const valid = product.isValid();
    expect(valid).equal(false);
  });

  it('Product decreaseSellIn', function () {
    product.decreaseSellIn();
    expect(product.getSellIn()).equal(9);
  });

  it('Product setPrice - update the price', function () {
    product.setPrice(0);
    expect(product.price).equal(0);
  });

  it('Product calculateAmount - valid sellIn', function () {
    const amount = product.calculateAmount(2);
    expect(amount).equal(2);
  });

  it('Product calculateAmount - invalid sellIn', function () {
    product.sellIn = -5;
    const amount = product.calculateAmount(2);
    expect(amount).equal(4);
  });
});

describe('CO Product Class Test - decrease Price', function () {
  beforeEach(function () {
    product = new Product('Medium Coverage', 10, 20);
  });

  it('Product decreasePrice - default value - valid sellIn', function () {
    product.decreasePrice();
    expect(product.price).equal(19);
  });

  it('Product decreasePrice  - valid sellIn', function () {
    product.decreasePrice(3);
    expect(product.getPrice()).equal(17);
  });

  it('Product decreasePrice - default value - invalid sellIn', function () {
    product.sellIn = -5;
    product.decreasePrice();
    expect(product.getPrice()).equal(18);
  });

  it('Product decreasePrice - invalid sellIn', function () {
    product.sellIn = -5;
    product.decreasePrice(2);
    expect(product.getPrice()).equal(16);
  });

  it('Product decreasePrice - minLimit reached', function () {
    product.sellIn = -5;
    product.price = 1;
    product.decreasePrice(2);
    expect(product.getPrice()).equal(0);
  });

});

describe('CO Product Class Test - increase Price', function () {
  beforeEach(function () {
    product = new Product('Medium Coverage', 10, 20);
  });

  it('Product increasePrice - default value - valid sellIn', function () {
    product.increasePrice();
    expect(product.price).equal(21);
  });

  it('Product increasePrice  - valid sellIn', function () {
    product.increasePrice(3);
    expect(product.getPrice()).equal(23);
  });

  it('Product increasePrice - default value - invalid sellIn', function () {
    product.sellIn = -5;
    product.increasePrice();
    expect(product.getPrice()).equal(22);
  });

  it('Product increasePrice - invalid sellIn', function () {
    product.sellIn = -5;
    product.increasePrice(2);
    expect(product.getPrice()).equal(24);
  });

  it('Product increasePrice - maxLimit reached', function () {
    product.sellIn = 5;
    product.price = 49;
    product.increasePrice(6);
    expect(product.getPrice()).equal(50);
  });
});
