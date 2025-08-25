describe('API Test - FakeStore', () => {
  const url = 'https://fakestoreapi.com/products';

  it('Should search for all "electronics" products and validate rating', () => {
    cy.request('GET', url).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      //Recover electronic objects
      const electronics = response.body.filter(item => item.category === 'electronics');

      //Ensure the list is not empty
      expect(electronics.length).to.be.greaterThan(0);

      //Validate essential properties
      electronics.forEach(item => {
        expect(item).to.have.property('title');
        expect(item).to.have.property('price');
        expect(item).to.have.property('rating');
        expect(item.rating).to.have.property('rate');
      });

      //Count how many have the category
      cy.log('Total electronic products: ${electronics.length}');

      //Count products with rating > 4
      const highRated = electronics.filter(item => item.rating?.rate > 4);
      cy.log('Electronic products with rating > 4: ${highRated.length}');
      expect(highRated.length).to.be.greaterThan(0);

      //Print found objects legibly
      cy.task('log', electronics.map(e => ({ title: e.title, price: e.price, rate: e.rating?.rate })));
    });
  });
});
