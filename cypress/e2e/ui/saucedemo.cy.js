import LoginPage from '../../support/pageObjects/loginPage.js';
import InventoryPage from '../../support/pageObjects/inventoryPage.js';

describe('UI Test - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
  });

  it('Checks item ordering A->Z and change to Z->A', () => {
    //A->Z order
    InventoryPage.getItemNames().then($items => {
      const names = [...$items].map(el => el.innerText);
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });

    //Z->A order
    InventoryPage.sortBy('Name (Z to A)');
    InventoryPage.getItemNames().then($items => {
      const names = [...$items].map(el => el.innerText);
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });
  });
});
