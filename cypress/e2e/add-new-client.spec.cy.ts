describe("Add-client", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add-client")
  })

  it("Render form correctly", () => {
    cy.get('input[id="nombre"]').should("exist")
    cy.get('input[id="apellido"]').should("exist")
    cy.get("div[id='tipoDocumento']").should("exist")
    cy.get('input[id="nroDocumento"]').should("exist")
    cy.get('input[id="nacionalidad"]').should("exist")
    cy.get('input[id="direccion"]').should("exist")
    cy.get('input[id="telefono"]').should("exist")
    cy.get('input[id="email"]').should("exist")
    cy.get('input[value="17/04/2000"]').should("exist")

    cy.contains(/add/i)
    cy.get('button[type="submit"]').should("exist")

    cy.contains(/cancel/i)
    cy.get('button[type="button"]').should("exist")
  })

  it("Form works when submitted valid data and make POST request with the entered data", () => {
    const newClientData = {
      nombre: "John",
      apellido: "Doe",
      tipo_documento: "DNI",
      nro_documento: "12345678",
      nacionalidad: "US",
      direccion: "123 Main St",
      telefono: "123456789",
      email: "john@example.com",
      fecha_nacimiento: "12061980",
    }
    // Enter data
    cy.get('input[id="nombre"]').type(newClientData.nombre)
    cy.get('input[id="apellido"]').type(newClientData.apellido)

    cy.get('div[id="tipoDocumento"]').click()
    cy.contains(newClientData.tipo_documento).click()

    cy.get('input[id="nroDocumento"]').type(newClientData.nro_documento)
    cy.get('input[id="nacionalidad"]').type(newClientData.nacionalidad)
    cy.get('input[id="direccion"]').type(newClientData.direccion)
    cy.get('input[id="telefono"]').type(newClientData.telefono)
    cy.get('input[id="email"]').type(newClientData.email)
    cy.get('input[value="17/04/2000"]').click().type(newClientData.fecha_nacimiento)

    cy.intercept("POST", "*", (req) => {
      const dataWithDateTransfomed = {
        ...newClientData,
        fecha_nacimiento: "1980-06-12T03:00:00.000Z",
      }
      expect(req.body).to.deep.equal(dataWithDateTransfomed)
      req.reply(newClientData)
    }).as("postRequest")

    cy.get('button[type="submit"]').click()

    cy.wait("@postRequest").then((interception) => {
      cy.location("pathname").should("equal", "/clients")
    })
  })
})
