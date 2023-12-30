describe("Clients", () => {
  it("should render list of clients", () => {
    cy.visit("http://localhost:3000/mocks/clients")

    cy.get("tr").should("have.length", 3)
    cy.get("th").should("have.length", 12)
    cy.get("td").should("have.length", 24)

    cy.contains("Luciana")
    cy.contains("Aymar")

    cy.contains("Diego")
    cy.contains("Milito")
  })
})
