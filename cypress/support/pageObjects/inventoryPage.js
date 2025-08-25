class InventoryPage {
  getItemNames() {
    return cy.get('.inventory_item_name').should('have.length.gt', 0);
  }

  sortBy(optionText) {
    cy.get('[data-test="product-sort-container"]').select(optionText);
  }

  getItemPrices() {
    return cy.get('.inventory_item_price');
  }
}

export default new InventoryPage();