describe("Home", () => {
  it("Render title and links correctly", () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Car Rental Admin Panel")
    cy.contains("Home")
    cy.get("nav a:first-child").should("have.class", "active")
    cy.contains(/Add a new car/i)
  })
})

describe("Navbar", () => {
  it("should navigate to correct path when click on links and assign active class", () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Car Rental Admin Panel")
    cy.get("a").contains("Add a new car").click()
    cy.get("a").contains("Add a new car").should("have.class", "active")
    cy.get("a").contains("Home").should("not.have.class", "active")
    cy.location("pathname").should("equal", "/add-car")

    cy.visit("http://localhost:3000/add-car")
    cy.contains("Car Rental Admin Panel")
    cy.get("a").contains("Home").click()
    cy.get("a").contains("Home").should("have.class", "active")
    cy.get("a").contains("Add a new car").should("not.have.class", "active")
    cy.location("pathname").should("equal", "/")
  })
})

describe("Add-car", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add-car")
  })

  it("Render form correctly", () => {
    cy.get('input[id="marca"]').should("exist")
    cy.get('input[id="modelo"]').should("exist")
    cy.get('input[id="year"]').should("exist")
    cy.get('input[id="km"]').should("exist")
    cy.get('input[id="color"]').should("exist")
    cy.get('input[id="ac"]').should("exist")
    cy.get('input[type="checkbox"]').should("exist")
    cy.get('input[id="pasajeros"]').should("exist")
    cy.get('div[id="cambios"]').should("exist")

    cy.contains(/add/i)
    cy.get('button[type="submit"]').should("exist")

    cy.contains(/cancel/i)
    cy.get('button[type="button"]').should("exist")
  })

  it("Form works when submitted valid data and make POST request with the entered data", () => {
    const formData = {
      marca: "Ford",
      modelo: "Fiesta",
      year: 2020,
      km: 1200,
      color: "gris",
      pasajeros: 4,
      ac: true,
      cambios: "MANUAL",
    }
    // Enter data
    cy.get('input[id="marca"]').type(formData.marca)
    cy.get('input[id="modelo"]').type(formData.modelo)
    cy.get('input[id="year"]').clear().type(formData.year.toString())
    cy.get('input[id="km"]').clear().type(formData.km.toString())
    cy.get('input[id="color"]').type(formData.color)
    cy.get('input[id="pasajeros"]').clear().click().type(formData.pasajeros.toString())

    cy.intercept("POST", "https://car-rental-api-dcat.onrender.com/api/car", (req) => {
      console.log(req.body)
      expect(req.body).to.deep.equal(formData)
      req.reply(formData)
    }).as("postRequest")

    cy.get('button[type="submit"]').click()

    cy.wait("@postRequest").then((interception) => {
      cy.location("pathname").should("equal", "/")
    })
  })
})
