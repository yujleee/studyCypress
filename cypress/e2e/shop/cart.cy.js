const STANDARD_USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('SourceDemo cart test', () => {
  it('should add product to cart and verify', () => {
    // 1. 웹사이트 방문 및 로그인
    cy.login(STANDARD_USERNAME, PASSWORD);

    // 2. 첫 번째 상품을 장바구니에 추가
    // cy.get('.inventory_item').first().find('button').click();

    // 랜덤한 상품 장바구니에 추가
    cy.get('.inventory_item').then((items) => {
      const randomIndex = Math.floor(Math.random() * items.length);
      cy.wrap(items).eq(randomIndex).find('button').click();
    });

    // 3. 장바구니에 아이템이 추가되었는지 확인
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  // 모든 아이템 추가
  it('should add all products to cart and verify', () => {
    cy.login(STANDARD_USERNAME, PASSWORD);

    cy.get('.inventory_item').then((items) => {
      const listLength = String(items.length);

      cy.wrap(items).each((item) => {
        cy.wrap(item).find('button').click();
      });

      cy.get('.shopping_cart_badge').should('contain', listLength);
    });
  });

  // 랜덤한 아이템 중복 없이 추가
  it('should add random products to cart and verify', () => {
    cy.login(STANDARD_USERNAME, PASSWORD);

    cy.get('.inventory_item').then((items) => {
      // 1부터 전체 아이템 개수 사이의 랜덤한 숫자 생성
      const totalItems = items.length;
      const randomCount = Math.floor(Math.random() * totalItems) + 1;
      const randomIndices = [];

      console.log('목표 아이템 개수:', randomCount);

      // 중복되지 않는 랜덤 인덱스 생성
      while (randomIndices.length < randomCount) {
        const randomIndex = Math.floor(Math.random() * totalItems);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      console.log('선택된 인덱스:', randomIndices);

      // 선택된 인덱스의 아이템만 카트에 추가
      randomIndices.forEach((index) => {
        cy.wrap(items[index]).find('button').click();
      });

      // 카트 뱃지의 숫자 확인
      cy.get('.shopping_cart_badge').should('have.text', randomCount.toString());
    });
  });
});
