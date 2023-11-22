import Header from "../Header"

// Navigation is tested in cypress/e2e

describe("Header Component", () => {
  it("Should render correctly", () => {
    cy.mount(<Header />)

    cy.contains("Car Rental Admin Panel")
    cy.contains("Cars")
    cy.contains(/Add new car/i)
    cy.contains(/Clients/i)
    cy.contains(/Add new client/i)
    cy.contains(/Active Transactions/i)
    cy.contains(/Add Transaction/i)
    cy.contains(/Historial/i)
  })
})
