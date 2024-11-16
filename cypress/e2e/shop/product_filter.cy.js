describe('SauceDemo product filter test', () => {
  it('should filter products by price (low to high)', () => {
    // 1. 웹사이트 방문, 로그인
    cy.login('standard_user', 'secret_sauce');

    // 2. 상품 페이지에서 필터 적용
    cy.get('.product_sort_container').select('lohi');

    // 3. 필터 적용 후 첫 번째 상품의 가격이 낮은지 확인
    cy.get('.inventory_item_price').first().should('contain', '$7.99');
  });

  it('should filter products by price (high to low)', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.get('.product_sort_container').select('hilo');

    cy.get('.inventory_item_price').first().should('contain', '$49.99');
  });
});
