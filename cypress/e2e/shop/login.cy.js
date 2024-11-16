describe('Saucedemo Login test - Success case', ()=>{  
    it('should login success', ()=>{    
        cy.login('standard_user','secret_sauce');

        // 로그인 성공 시 확인 (상품 페이지 이동 여부)
        cy.url().should('include', '/inventory.html');
    })

});


describe('Saucedemo login test - No username', () => {
    it('should display error when no username is entered',()=>{
        cy.visit('https://www.saucedemo.com/');

        // 패스워드만 입력
        cy.login('','secret_sauce');

        // 에러 메시지 컨테이너 div 보여지고 해당하는 에러 메시지 노출되는지 확인
        cy.errorMessage('Username is required');
    })
})


describe('Saucedemo login test - Invalid username and password', () => {
    it('should display error when invalid username is entered',()=>{
        // 잘못된 아이디 입력
        cy.login('isual_user','secret_sauc');

        // 에러 메시지 컨테이너 div 보여지고 해당하는 에러 메시지 노출되는지 확인
        cy.errorMessage('Username and password do not match any user in this service');
    });


    it('should display error when invalid password is entered',()=>{
        // 잘못된 패스워드 입력
        cy.login('standard_user','secret_sauc');

        // 에러 메시지 컨테이너 div 보여지고 해당하는 에러 메시지 노출되는지 확인
        cy.errorMessage('Username and password do not match any user in this service');
    });
})


describe('Saucedemo login test - No password', () => {
    it('should display error when password is not entered',()=>{
        // 패스워드 미입력
        cy.login('standard_user','');

        // 에러 메시지 컨테이너 div 보여지고 해당하는 에러 메시지 노출되는지 확인
        cy.errorMessage('Password is required');
    })
})
