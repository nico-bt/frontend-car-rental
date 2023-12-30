describe("Add-client", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/mocks/add-transaction")
  })

  it("Render form correctly", () => {
    cy.get('div[id="car"]').should("exist")
    cy.get('div[id="client"]').should("exist")
    cy.contains("Fecha Inicio")
    cy.contains("Fecha Fin")

    cy.contains(/add/i)
    cy.get('button[type="submit"]').should("exist")

    cy.contains(/cancel/i)
    cy.get('button[type="button"]').should("exist")
  })

  it("Form works when submitted valid data and make POST request with the entered data", () => {
    // Enter data
    cy.get('div[id="client"]').click()
    cy.contains("Diego Milito").click()

    cy.contains("Fecha Inicio").parent().click().type("11/11/2023")
    cy.contains("Fecha Fin").parent().click().type("13/11/2023")

    cy.contains("Preview")
    cy.contains("Price per day: $40")
    cy.contains("Days: 2")
    cy.contains("Total Price: 80")

    const enteredDataWithDatesTransformed = {
      carId: 45,
      clientId: 16,
      start_date: "2023-11-11T03:00:00.000Z",
      finish_date: "2023-11-13T03:00:00.000Z",
    }

    cy.intercept("POST", "*", (req) => {
      expect(req.body).to.deep.equal(enteredDataWithDatesTransformed)
      req.reply(req.body)
    }).as("postRequest")

    cy.get('button[type="submit"]').click()

    cy.wait("@postRequest").then((interception) => {
      cy.location("pathname").should("equal", "/transactions")
    })
  })

  it("should to not submit and thown an error if finish date is before starting date", () => {
    // Enter data
    cy.get('div[id="client"]').click()
    cy.contains("Diego Milito").click()
    cy.contains("Fecha Inicio").parent().click().type("13/11/2023")
    cy.contains("Fecha Fin").parent().click().type("11/11/2023")

    let postRequestMade = false
    cy.intercept("POST", "*", (req) => {
      postRequestMade = true
      req.reply(req.body)
    }).as("postRequest")

    cy.get('button[type="submit"]').click()

    cy.contains("Los días de alquiler tienen que ser un numero positivo")

    cy.wait(1000)
    cy.wrap(postRequestMade).should("eq", false)
  })
})
