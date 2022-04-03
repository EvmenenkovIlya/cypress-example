describe( "AddNewTariffPlan", ()=> {
    beforeEach(()=>{
    cy.visit("https://demo.guru99.com/telecom/addtariffplans.php")
    });

    it("Chek page view", function() {        
        cy.get('a.logo').contains('a','Guru99 telecom').should('be.visible');
        cy.get('.inner').contains('Add Tariff Plans').should('be.visible');
        cy.get('input[name="submit"]').should('be.visible');
        cy.get('input[type="Reset"]').should('be.visible');    
    });

    it("ResetBotton",  function() {       
        cy.FillWithDataTariffPlan(ValidNumbers)
        cy.get('input[type = "reset"]').click()  
        cy.CheckTextboxesAreEmpty()   
    });

    it("ValidData",  function() {       
        cy.FillWithDataTariffPlan(ValidNumbers)
        cy.get('input[type = "submit"]').click()  
        cy.contains("Congratulation you add Tariff Plan").should("be.visible");
        cy.visit("https://demo.guru99.com/telecom/assigntariffplantocustomer.php")
        cy.get('input[name = "customer_id"]').type('881576')
        cy.get('input[type = "submit"]').click()
        //Check TariffPlan
    });

    it("EmptyFields",  function() {      
        cy.get('input[type = "submit"]').click() 
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);     
    });

    it("SpecialChars",  function() {      
        cy.FillWithDataTariffPlan(SpecialChars)
        cy.contains("Special characters are not allowed").should("be.visible");
        cy.get('input[type = "submit"]').click() 
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);     
    });


})

Cypress.Commands.add("FillWithDataTariffPlan", ({charsLength5, charsLength3}) => {
    cy.get('input[name = "rental"]').type(charsLength5)
    cy.get('input[name = "local_minutes"]').type(charsLength5)
    cy.get('input[name = "inter_minutes"]').type(charsLength5)
    cy.get('input[name = "sms_pack"]').type(charsLength5)
    cy.get('input[name = "minutes_charges"]').type(charsLength3)
    cy.get('input[name = "inter_charges"]').type(charsLength3)
    cy.get('input[name = "sms_charges"]').type(charsLength3)
});
Cypress.Commands.add("CheckTextboxesAreEmpty", () => {
    cy.get('input[name = "rental"]').should("have.text", '');
        cy.get('input[name = "local_minutes"]').should("have.text", '');
        cy.get('input[name = "inter_minutes"]').should("have.text", '');
        cy.get('input[name = "sms_pack"]').should("have.text", '');
        cy.get('input[name = "minutes_charges"]').should("have.text", '');
        cy.get('input[name = "inter_charges"]').should("have.text", '');
        cy.get('input[name = "sms_charges"]').should("have.text", ''); 
});
const ValidNumbers = {
    charsLength5: '12345',
    charsLength3: '123',
}
const inValidNumbers = {
    charsLength5: '-123',
    charsLength3: '-1',
}
const SpecialChars = {
    charsLength5: '^&*',
    charsLength3: '!@3',
}