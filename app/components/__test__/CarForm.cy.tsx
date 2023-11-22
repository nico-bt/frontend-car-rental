import React from "react"
import CarForm from "../CarForm"
import { CarType } from "@/api/car-rental-api"

describe("<CarForm />", () => {
  describe("Adding a car", () => {
    beforeEach(() => {
      cy.stub(CarForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(<CarForm mode="add" />)
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
        price: 42,
      }
      // Enter data
      cy.get('input[id="marca"]').type(formData.marca)
      cy.get('input[id="modelo"]').type(formData.modelo)
      cy.get('input[id="year"]').clear().type(formData.year.toString())
      cy.get('input[id="km"]').clear().click().type(formData.km.toString())
      cy.get('input[id="color"]').type(formData.color)
      cy.get('input[id="price"]').clear().click().type(formData.price.toString())
      cy.get('input[id="pasajeros"]').clear().click().type(formData.pasajeros.toString())

      cy.intercept("POST", "*", (req) => {
        expect(req.body).to.deep.equal(formData)
        req.reply(formData)
      }).as("postRequest")

      cy.get('button[type="submit"]').click()

      cy.wait("@postRequest").then((interception) => {
        cy.get("@useRouterStub").should("have.been.called")
      })
    })
  })

  describe("Editing a car", () => {
    const mockCar = {
      id: 45,
      marca: "BMW",
      modelo: "X6",
      year: 2022,
      km: 4200,
      color: "negro",
      ac: true,
      pasajeros: 5,
      cambios: "AUTOMATICO",
      created_at: "2023-11-07T16:29:49.219Z",
      updated_at: "2023-11-15T19:18:41.008Z",
      is_rented: false,
      price: 40,
    } as CarType

    beforeEach(() => {
      cy.stub(CarForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(<CarForm mode="edit" car={mockCar} />)
    })

    it("Render form correctly", () => {
      cy.get('input[id="marca"]').should("have.value", mockCar.marca)
      cy.get('input[id="modelo"]').should("have.value", mockCar.modelo)
      cy.get('input[id="year"]').should("have.value", mockCar.year)
      cy.get('input[id="km"]').should("have.value", mockCar.km)
      cy.get('input[id="color"]').should("have.value", mockCar.color)
      cy.get('input[id="price"]').should("have.value", mockCar.price)
      cy.get('input[id="ac"]').should("be.checked")
      cy.get('input[id="pasajeros"]').should("have.value", mockCar.pasajeros)
      cy.contains(/automático/i)

      cy.contains(/edit/i)
      cy.get('button[type="submit"]').should("exist")

      cy.contains(/cancel/i)
      cy.get('button[type="button"]').should("exist")
    })

    it("Form works when submitted valid data and make PATCH request with the entered data", () => {
      const formData = {
        marca: "Ford",
        modelo: "Fiesta",
        year: 2020,
        km: 1200,
        color: "gris",
        pasajeros: 4,
        ac: true,
        cambios: "MANUAL",
        price: 42,
      }
      // Enter data
      cy.get('input[id="marca"]').clear().type(formData.marca)
      cy.get('input[id="modelo"]').clear().type(formData.modelo)
      cy.get('input[id="year"]').clear().type(formData.year.toString())
      cy.get('input[id="km"]').clear().click().type(formData.km.toString())
      cy.get('input[id="color"]').clear().type(formData.color)
      cy.get('input[id="price"]').clear().click().type(formData.price.toString())
      cy.get('input[id="pasajeros"]').clear().click().type(formData.pasajeros.toString())
      cy.contains("Automático").click()
      cy.contains("Manual").click()

      cy.intercept("PATCH", "*", (req) => {
        expect(req.body).to.deep.equal(formData)
        req.reply(formData)
      }).as("patchRequest")

      cy.get('button[type="submit"]').click()

      cy.wait("@patchRequest").then((interception) => {
        cy.get("@useRouterStub").should("have.been.called")
      })
    })
  })
})
