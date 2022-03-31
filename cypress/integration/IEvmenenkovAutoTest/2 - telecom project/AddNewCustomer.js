describe( "AddNewCustomer", ()=> {
    beforeEach(()=>{
    cy.visit("https://demo.guru99.com/telecom/addcustomer.php")  
    });

    it("ResetBotton",  function() {       
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer("test", "test", "Test@test.com", "Test", 12345)
        cy.get('input[type = "reset"]').click()  
        cy.CheckTextboxesAreEmpty()   
    });

    it("ValidData",  function() {      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer('Bob', 'Robert', 'Bob.Robert@gmail.com', 'The Uniated States', '89558987745')
        cy.get('input[type = "submit"]').click()     
        cy.url().should('contain', 'https://demo.guru99.com/telecom/access.php?uid=')        
        // Check that
    });
    it("ValidData",  function() {      
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.get('label[for="done"]').click()
        cy.FillWithDataNewCustomer('Bob', 'Robert', 'Bob.Robert@gmail.com', 'The Uniated States', '89558987745')
        cy.get('input[type = "submit"]').click()             
        // Check that
    });



})

Cypress.Commands.add("FillWithDataNewCustomer", (firstName, lastName, email, addres, phone ) => {
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
const userDataEmpty = {
    firstName: '',
    lastName: '',
    email: '',
    addres: '',
    phone: ''
}

const userDataValid = {
    firstName: 'Bob',
    lastName: 'Robert',
    email: 'Bob.Robert@gmail.com',
    addres: 'The Uniated States',
    phone: '89558987745'
}
const specialChars = {
    firstName: 'test',
    lastName: 'test',
    email: 'Test@test.com',
    addres: 'test',
    phone: '89598586677'
}