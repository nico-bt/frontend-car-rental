describe("Header", () => {
  it("Render title and links correctly", () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Car Rental Admin Panel")
    cy.contains("Cars")
    cy.get("nav a:first-child").should("have.class", "active")
    cy.contains(/Add new car/i)
    cy.contains(/Clients/i)
    cy.contains(/Add new client/i)
    cy.contains(/Active Transactions/i)
    cy.contains(/Add Transaction/i)
    cy.contains(/Historial/i)
  })

  describe("Navbar links", () => {
    it("should navigate correctly when clicking links and assign 'active' class only to actual link route", () => {
      cy.visit("http://localhost:3000/")

      const linksArray = [
        { link: "Cars", route: "/" },
        { link: "Add new car", route: "/add-car" },
        { link: "Clients", route: "/clients" },
        { link: "Add new client", route: "/add-client" },
        { link: "Active Transactions", route: "/transactions" },
        { link: "Add transaction", route: "/add-transaction" },
        { link: "Historial", route: "/historial" },
      ]

      linksArray.forEach(({ link, route }) => {
        cy.get(`header nav a:contains('${link}')`)
          .click()
          .then(() => {
            cy.get(`header nav a:contains('${link}')`).should("have.class", "active")

            // Rest of links should not have class "active"
            cy.get(`header nav a`).each(($otherLink) => {
              if ($otherLink.text().trim() !== link) {
                cy.wrap($otherLink).should("not.have.class", "active")
              }
            })

            cy.location("pathname").should("equal", route)
          })
      })
    })
  })
})
