describe("Historial", () => {
  it("should render historial: list of active and finished transactions", () => {
    cy.visit("http://localhost:3000/mocks/historial")

    cy.get("tr").should("have.length", 3)
    cy.get("th").should("have.length", 8)
    cy.get("td").should("have.length", 16)

    cy.contains("Toyota")
    cy.contains("XLM")
    cy.contains("Maria Laura Ramirez")
    cy.contains("30123123")

    cy.contains("BMW")
    cy.contains("Z4 Roadster")
    cy.contains("Enzo Francescoli")
    cy.contains("20156456")
  })
})
