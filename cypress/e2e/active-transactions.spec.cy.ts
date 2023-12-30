describe("active-transactions", () => {
  it("should render list of active transactions", () => {
    cy.visit("http://localhost:3000/mocks/active-transactions")

    cy.get("tr").should("have.length", 2)
    cy.get("th").should("have.length", 9)
    cy.get("td").should("have.length", 9)

    cy.contains("Toyota")
    cy.contains("XLM")

    cy.contains("Maria Laura Ramirez")
    cy.contains("30123123")
  })
})
