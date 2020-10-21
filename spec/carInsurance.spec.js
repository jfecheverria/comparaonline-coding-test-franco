const expect = require('chai').expect;
const Models = require('../src/models/index');
const CarInsurance = Models.CarInsurance;
const Product = Models.Product;

describe('CO Test Medium Coverage', function () {
  it('Price should decrease in one if sellIn is positive and price over zero', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', 10, 20)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(19);
  });

  it('Price should decrease in two if sellIn is negative and price over zero', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', -10, 10)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(-11);
    expect(products[0].price).equal(8);
  });

  it('Price should be zero with sellIn positive', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', 4, 1)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(3);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero with sellIn negative', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', -4, 2)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(-5);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero with sellIn negative, checking minLimit', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', -4, 1)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(-5);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero if was zero previously', function () {
    let coTestProduct = new CarInsurance([new Product('Medium Coverage', -14, 0)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Medium Coverage');
    expect(products[0].sellIn).equal(-15);
    expect(products[0].price).equal(0);
  });
});

describe('CO Test Full Coverage', function () {
  it('Price should increase default if sellIn is positive', function () {
    let coTestProduct = new CarInsurance([new Product('Full Coverage', 2, 0)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Full Coverage');
    expect(products[0].sellIn).equal(1);
    expect(products[0].price).equal(1);
  });

  it('Price should increase duplicating default if sellIn is negative', function () {
    let coTestProduct = new CarInsurance([new Product('Full Coverage', -2, 4)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Full Coverage');
    expect(products[0].sellIn).equal(-3);
    expect(products[0].price).equal(6);
  });

  it('Price should not be greater than 50', function () {
    let coTestProduct = new CarInsurance([new Product('Full Coverage', -3, 49)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Full Coverage');
    expect(products[0].sellIn).equal(-4);
    expect(products[0].price).equal(50);
  });
});

describe('CO Test Mega Coverage', function () {
  it('Price should not be modified - legendary product: sellIn=0 / price=80', function () {
    let coTestProduct = new CarInsurance([new Product('Mega Coverage', 0, 80)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Mega Coverage');
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(80);
  });

  it('Price should not be modified - legendary product: sellIn=-1 / price=80', function () {
    let coTestProduct = new CarInsurance([new Product('Mega Coverage', -1, 80)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Mega Coverage');
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(80);
  });
});

describe('CO Test Special Full Coverage', function () {
  it('Price should increase by one if sellIn is greater than 10', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', 11, 45)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(10);
    expect(products[0].price).equal(46);
  });

  it('Price should increase by two if sellIn is between 6 and 10', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', 7, 45)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(6);
    expect(products[0].price).equal(47);
  });

  it('Price should increase by three if sellIn is between 1 and 5', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', 5, 45)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(4);
    expect(products[0].price).equal(48);
  });

  it('Price should be zero if sellIn is negative', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', -5, 20)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(-6);
    expect(products[0].price).equal(0);
  });

  it('Price should not be greater than 50', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', 7, 48)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(6);
    expect(products[0].price).equal(50);
  });

  it('Price should not be greater than 50 - exceding maxLimit', function () {
    let coTestProduct = new CarInsurance([new Product('Special Full Coverage', 5, 49)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Special Full Coverage');
    expect(products[0].sellIn).equal(4);
    expect(products[0].price).equal(50);
  });
});

describe('CO Test Super Sale ', function () {
  it('Price should be decreasing at double of default, sellIn positive', function () {
    let coTestProduct = new CarInsurance([new Product('Super Sale', 3, 6)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Super Sale');
    expect(products[0].sellIn).equal(2);
    expect(products[0].price).equal(4);
  });

  it('Price should be decrease at double of default, sellIn negative', function () {
    let coTestProduct = new CarInsurance([new Product('Super Sale', -2, 4)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Super Sale');
    expect(products[0].sellIn).equal(-3);
    expect(products[0].price).equal(0);
  });

  it('Price should not be less than zero, sellIn negative', function () {
    let coTestProduct = new CarInsurance([new Product('Super Sale', -2, 1)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal('Super Sale');
    expect(products[0].sellIn).equal(-3);
    expect(products[0].price).equal(0);
  });
});

describe('CO Test Empty product list ', function () {
  it("If CarInsurance's parameter product list is empty, initialize with empty array", function () {
    let coTestProduct = new CarInsurance();
    const products = coTestProduct.updatePrice();
    expect(products.length).equal(0);
  });
});

describe('CO Test Escalable - Adding a new product', function () {
  beforeEach(function () {
    mockName = 'Mock new Product';
  });
  it('Price should decrease in one if sellIn is positive and price over zero', function () {
    let coTestProduct = new CarInsurance([new Product(mockName, 10, 20)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(19);
  });

  it('Price should decrease in two if sellIn is negative and price over zero', function () {
    let coTestProduct = new CarInsurance([new Product(mockName, -10, 10)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(-11);
    expect(products[0].price).equal(8);
  });

  it('Price should be zero with sellIn positive', function () {
    coTestProduct = new CarInsurance([new Product(mockName, 4, 1)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(3);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero with sellIn negative', function () {
    coTestProduct = new CarInsurance([new Product(mockName, -4, 2)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(-5);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero with sellIn negative, checking minLimit', function () {
    coTestProduct = new CarInsurance([new Product(mockName, -4, 1)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(-5);
    expect(products[0].price).equal(0);
  });

  it('Price should be zero if was zero previously', function () {
    coTestProduct = new CarInsurance([new Product(mockName, -14, 0)]);
    const products = coTestProduct.updatePrice();
    expect(products[0].name).equal(mockName);
    expect(products[0].sellIn).equal(-15);
    expect(products[0].price).equal(0);
  });
});
