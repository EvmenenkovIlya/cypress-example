describe( "AddNewCustomer", ()=> {
    beforeEach(()=>{
    cy.visit("https://demo.guru99.com/telecom/addcustomer.php")  
    });

    it("Chek page view", function() {        
        cy.get('a.logo').contains('a','Guru99 telecom').should('be.visible')
        cy.get('.inner').contains('Add Customer').should('be.visible')    
        cy.get('input[type="submit"]').should('be.visible');
        cy.get('input[type="Reset"]').should('be.visible');
        
    });

    it("ResetBotton",  function() {       
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer(UserDataTest)
        cy.get('input[type = "reset"]').click()  
        cy.CheckTextboxesAreEmpty()   
    });

    it("ValidData",  function() {      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer(userDataValid)
        cy.get('input[type = "submit"]').click()     
        cy.url().should('contain', 'https://demo.guru99.com/telecom/access.php?uid=')        
    });

    it("EmptyData",  function() {      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.get('input[type = "submit"]').click()    
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields');
        });
        cy.on('window:confirm', () => true);
        cy.get('table').should('not.exist');
        cy.url().should('eq', 'https://demo.guru99.com/telecom/addcustomer.php');        
    });

    it("InvalidData", function () {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer(userDataInValid)
        cy.get('input[type = "submit"]').click()  
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields');
        });
        cy.on('window:confirm', () => true);
        cy.get('table').should('not.exist');
    });
});

Cypress.Commands.add("FillWithDataNewCustomer", ({firstName, lastName, email, addres, phone} ) => {
    cy.get('input[name = "fname"]').type(firstName)
    cy.get('input[name = "lname"]').type(lastName)
    cy.get('input[name = "emailid"]').type(email)
    cy.get('textarea[name = "addr"]').type(addres)
    cy.get('input[name="telephoneno"]').type(phone)
});

Cypress.Commands.add("CheckTextboxesAreEmpty", () => {
    cy.get('input[name = "fname"]').should("have.text", '');
    cy.get('input[name = "lname"]').should("have.text", '');
    cy.get('input[name = "emailid"]').should("have.text", '');
    cy.get('textarea[name = "addr"]').should("have.text", '');
    cy.get('input[name="telephoneno"]').should("have.text", '');
});

const UserDataTest = {
    firstName: 'test',
    lastName: 'test',
    email: 'Test@test.com',
    addres: 'test',
    phone: '89598586677'
}

const userDataValid = {
    firstName: 'Bob',
    lastName: 'Robert',
    email: 'Bob.Robert@gmail.com',
    addres: 'The Uniated States',
    phone: '89558987745'
}
const userDataInValid = {
    firstName: '1test',
    lastName: '1test',
    email: 'Testtestcom',
    addres: 'test*(&^',
    phone: '895985nmk677'
}