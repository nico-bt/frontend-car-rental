import React from "react"
import TransactionForm from "../TransactionForm"
import { mockActiveTransactions, mockCars, mockClients } from "@/app/mocks/mockData"
import dayjs from "dayjs"

describe("<TransactionForm />", () => {
  describe("Adding a transaction", () => {
    beforeEach(() => {
      cy.stub(TransactionForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(<TransactionForm cars={mockCars} clients={mockClients} mode="add" />)
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

  describe("Editing a transaction", () => {
    const mockTransaction = {
      id: 18,
      clientId: mockClients[0].id,
      carId: mockCars[0].id,
      start_date: "2023-11-17T03:00:00.000Z",
      finish_date: "2023-11-30T03:00:00.000Z",
      price_per_day: mockCars[0].price,
      total_price: 13 * mockCars[0].price,
      is_active: true,
      created_at: "2023-11-18T00:42:13.589Z",
      updated_at: "2023-11-18T00:42:13.589Z",
      client: mockClients[0],
      car: mockCars[0],
    }

    beforeEach(() => {
      cy.stub(TransactionForm, "useRouter")
        .as("useRouterStub")
        .returns({ pathname: "/", push: () => null, refresh: () => null })
      cy.mount(
        <TransactionForm
          cars={mockCars}
          clients={mockClients}
          mode="edit"
          transaction={mockTransaction}
        />
      )
    })

    it("Render form correctly", () => {
      cy.get('div[id="car"]').contains(mockTransaction.car.marca + " " + mockTransaction.car.modelo)
      cy.get('div[id="client"]').contains(mockTransaction.client.apellido)
      cy.get(`input[value="${new Date(mockTransaction.start_date).toLocaleDateString("en-GB")}"]`)
      cy.get(`input[value="${new Date(mockTransaction.finish_date).toLocaleDateString("en-GB")}"]`)

      cy.contains(/edit/i)
      cy.get('button[type="submit"]').should("exist")

      cy.contains(/cancel/i)
      cy.get('button[type="button"]').should("exist")
    })

    it("Form works when submitted valid data and make PATCH request with the entered data", () => {
      const editedFormData = {
        carId: mockCars[1].id,
        clientId: mockClients[1].id,
        start_date: "17/12/2023",
        finish_date: "18/12/2023",
      }

      cy.intercept("PUT", "*", (req) => {
        const dataWithDatesTransformed = {
          ...editedFormData,
          start_date: "2023-12-17T03:00:00.000Z",
          finish_date: "2023-12-18T03:00:00.000Z",
        }
        expect(req.body).to.deep.equal(dataWithDatesTransformed)
        req.reply({ statusCode: 200, body: {} })
      }).as("putRequest")

      //Editing the values
      cy.get('div[id="car"]')
        .contains(mockTransaction.car.marca + " " + mockTransaction.car.modelo)
        .click()
      cy.contains(mockCars[1].marca + " " + mockCars[1].modelo).click()

      cy.get('div[id="client"]').contains(mockTransaction.client.apellido).click()
      cy.contains(mockClients[1].apellido).click()

      cy.get(
        `input[value="${new Date(mockTransaction.start_date).toLocaleDateString("en-GB")}"]`
      ).type(editedFormData.start_date)
      cy.get(
        `input[value="${new Date(mockTransaction.finish_date).toLocaleDateString("en-GB")}"]`
      ).type(editedFormData.finish_date)

      cy.get('button[type="submit"]').click()

      cy.wait("@putRequest").then(() => {
        cy.get("@useRouterStub").should("have.been.called")
      })
    })
  })
})
