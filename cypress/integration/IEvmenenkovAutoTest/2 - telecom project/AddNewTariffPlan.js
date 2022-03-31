describe( "AddNewTariffPlan", ()=> {
    beforeEach(()=>{
    cy.visit("https://demo.guru99.com/telecom/addtariffplans.php")
    });

    it("ResetBotton",  function() {       
        cy.FillWithDataTariffPlan(12345,123)
        cy.get('input[type = "reset"]').click()  
        cy.CheckTextboxesAreEmpty()   
    });

    it("ValidData",  function() {       
        cy.FillWithData(12345,123)
        cy.get('input[type = "submit"]').click()  
        cy.contains("Congratulation you add Tariff Plan").should("be.visible");
        cy.visit("https://demo.guru99.com/telecom/assigntariffplantocustomer.php")
        cy.get('input[name = "customer_id"]').type('881576')
        cy.get('input[type = "submit"]').click()
        //Check TariffPlan
    });

    it("SpecialChars",  function() {      
        cy.FillWithData('!@#$*','!@#')
        cy.contains("Special characters are not allowed").should("be.visible");
        cy.get('input[type = "submit"]').click()      
    });
})

Cypress.Commands.add("FillWithDataTariffPlan", (charsLength5, charsLength3) => {
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