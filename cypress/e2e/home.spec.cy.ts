describe("Home", () => {
  it("Render title and links correctly", () => {
    cy.visit("http://localhost:3000/mocks/home")
    cy.contains("Car Rental Admin Panel")
  })

  describe("Cars", () => {
    it("should render list of cars", () => {
      cy.visit("http://localhost:3000/mocks/home")

      cy.get("tr").should("have.length", 3)
      cy.get("th").should("have.length", 12)
      cy.get("td").should("have.length", 24)

      cy.contains("BMW")
      cy.contains("X6")

      cy.contains("Ferrari")
      cy.contains("458 Spider")
    })
  })
})
