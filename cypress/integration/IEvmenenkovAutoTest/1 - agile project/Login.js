describe( "Log in", ()=> {
    beforeEach(()=>{
    cy.visit("http://demo.guru99.com/Agile_Project/Agi_V1/")
    });

    it("Chek page view", function() {
        cy.get('*form[name="frmLogin"]').should('be.visible');
        cy.get('input[name="uid"]').should('be.visible').and('have.attr', 'maxlength','10');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="btnLogin"]').scrollIntoView().should('be.visible');
        cy.get('input[name="btnReset"]').scrollIntoView().should('be.visible'); 
    });

    it("ResetBotton",  function() {   
        cy.fillLoginAndPassword(validLoginAndPassword)    
        cy.get('input[type = "reset"]').click()    
        cy.get('input[type = "text"]').should("have.text", '');
        cy.get('input[type = "password"]').should("have.text", '');
    });

    it("Sign in",  function() {
        cy.fillLoginAndPassword(validLoginAndPassword)    
        cy.contains("LOGIN").click()
        cy.contains("Welcome To Customer's Page of Guru99 Bank").should("be.visible");
        cy.url().should('include', '/customer/Customerhomepage')
        cy.title().should('eq', 'Guru99 Bank Customer HomePage')
    });

    // incorrect alert behaviour which blocked next tests

    /*it("InvalidPassword",  function() {
        cy.fillLoginAndPassword('1303', 'Guru999')    
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')        
        //messageContainsError
    });
    it("ValidPassworInUpCase",  function() {
        cy.fillLoginAndPassword('1303', 'GURU99')    
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')  
        //messageContainsError
    });
    it("InvalidLogin",  function() {
        cy.fillLoginAndPassword('130', 'Guru99')    
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')  
        //messageContainsError
    });
    it("EmptyLoginAndPassword",  function() {
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')  
        //messageContainsError
    });
    it("EmptyPassword",  function() {
        cy.get('input[type = "text"]').type("1303")
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')  
        //messageContainsError
    });
    it("EmoptyLogin",  function() {
        cy.get('input[type = "password"]').type("Guru99")
        cy.contains("LOGIN").click()
        cy.title().should('eq', 'Guru99 Bank Home Page')  
        //messageContainsError
    });*/
})
Cypress.Commands.add("fillLoginAndPassword", ({login, password} ) => {
    cy.get('input[type = "text"]').type(login)
    cy.get('input[type = "password"]').type(password)
});

const validLoginAndPassword = {
    login: "1303",
    password: "Guru99",
}
const invalidLoginAndPassword = {
    login: '1302',
    password: 'Guru98',
}
const invalidLoginAndValidPassword = {
    login: '1302',
    password: 'Guru99',
}
const validLoginAndInvalidPassword = {
    login: '1303',
    password: 'Guru98',
}
const validLoginAndValidPasswordInUpperCase = {
    login: '1303',
    password: 'GURU99',
}
const emptyLoginAndPassword = {
    login: '',
    password: '',
}