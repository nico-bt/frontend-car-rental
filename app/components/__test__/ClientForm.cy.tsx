import React from "react"
import ClientForm from "../ClientForm"
import { ClientType } from "@/api/car-rental-api"
import dayjs from "dayjs"

describe("<ClientForm />", () => {
  describe("Adding a client", () => {
    beforeEach(() => {
      cy.stub(ClientForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(<ClientForm mode="add" />)
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
    })
  })

  describe("Editing a client", () => {
    const mockClient = {
      id: 18,
      nombre: "Luciana ",
      apellido: "Aymar",
      tipo_documento: "DNI",
      nro_documento: "30444777",
      nacionalidad: "Argentina",
      direccion: "Maipu 478",
      telefono: "1123457676",
      email: "lucha@mail.com",
      fecha_nacimiento: "1980-09-09T03:00:00.000Z",
      created_at: "2023-11-11T20:25:31.908Z",
      updated_at: "2023-11-15T19:29:47.887Z",
      is_renting: false,
    } as ClientType

    beforeEach(() => {
      cy.stub(ClientForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(<ClientForm mode="edit" client={mockClient} />)
    })

    it("Render form with client data to edit", () => {
      cy.get('input[id="nombre"]').should("have.value", mockClient.nombre)
      cy.get('input[id="apellido"]').should("have.value", mockClient.apellido)
      cy.get("div[id='tipoDocumento']").contains(mockClient.tipo_documento)
      cy.get('input[id="nroDocumento"]').should("have.value", mockClient.nro_documento)
      cy.get('input[id="nacionalidad"]').should("have.value", mockClient.nacionalidad)
      cy.get('input[id="direccion"]').should("have.value", mockClient.direccion)
      cy.get('input[id="telefono"]').should("have.value", mockClient.telefono)
      cy.get('input[id="email"]').should("have.value", mockClient.email)
      cy.get('input[value="09/09/1980"]').should("exist")

      cy.contains(/edit/i)
      cy.get('button[type="submit"]').should("exist")

      cy.contains(/cancel/i)
      cy.get('button[type="button"]').should("exist")
    })

    it("Form works when submitted valid data and make PATCH request with the entered data", () => {
      const formData = {
        nombre: "Julian",
        apellido: "Montenegro",
        tipo_documento: "DNI",
        nro_documento: "30200600",
        nacionalidad: "Argentina",
        direccion: "Maipu 478",
        telefono: "1149995566",
        email: "jj@mail.com",
        fecha_nacimiento: "02/02/1970",
      }
      // Enter data
      cy.get('input[id="nombre"]').clear().type(formData.nombre)
      cy.get('input[id="apellido"]').clear().type(formData.apellido)
      cy.get('input[id="nroDocumento"]').clear().type(formData.nro_documento)
      cy.get('input[id="nacionalidad"]').clear().type(formData.nacionalidad)
      cy.get('input[id="direccion"]').clear().type(formData.direccion)
      cy.get('input[id="telefono"]').clear().type(formData.telefono)
      cy.get('input[id="email"]').clear().type(formData.email)
      cy.get('input[value="09/09/1980"]').click().type(formData.fecha_nacimiento)

      cy.intercept("PATCH", "*", (req) => {
        const formDataWithDateTransformed = {
          ...formData,
          fecha_nacimiento: "1970-02-02T03:00:00.000Z",
        }
        expect(req.body).to.deep.equal(formDataWithDateTransformed)
        req.reply(formDataWithDateTransformed)
      }).as("patchRequest")

      cy.get('button[type="submit"]').click()
    })
  })
})
