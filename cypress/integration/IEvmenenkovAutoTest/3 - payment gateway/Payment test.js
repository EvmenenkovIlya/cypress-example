describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
    });

    it("Chek page view", function() {        
        cy.get('a.logo').contains('a[href="purchasetoy.php"]','Guru99 Payment Gateway').should('be.visible');   
        cy.get('h2').contains('Mother Elephant With Babies Soft Toy').should('be.visible');
        cy.get('img[src="images/Toy.jpg"]').should('be.visible');
        cy.get('h3').contains('Price: $20').should('be.visible');
        cy.get('input[type="submit"]').should('have.attr','value','Buy Now').and('be.visible').click();
        cy.url().should('eq','https://demo.guru99.com/payment-gateway/process_purchasetoy.php');
    });

    it('Correct payment check', () => {
        cy.get('select[name="quantity"]').select('3');
        cy.get('input[type="submit"]').click();
        cy.FillWithCardNumber(validCard);
        cy.get('input[type="submit"]').should('have.attr','value','Pay $60.00').click();
        cy.url().should('contain','genearte_orderid.php?uid=');
        cy.get('h2').contains('Payment successfull!').should('be.visible');
        cy.get('td').eq(0).contains('Order ID').should('be.visible');
        cy.get('td').eq(2).contains('Please Note Down Your OrderID').should('be.visible');
    });   
})

Cypress.Commands.add("FillWithCardNumber", ({cardNumber, month, year, cvv}) => {
        cy.get('#card_nmuber').type(cardNumber);
        cy.get('select[name="month"]').select(month);
        cy.get('select[name="year"]').select(year);
        cy.get('#cvv_code').type(cvv);    
});

const validCard = {
    cardNumber: '4788307585223356',
    month: '09',
    year: '2022',
    cvv: '585',
}