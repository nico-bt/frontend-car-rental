import { mockCars } from "@/app/mocks/mockData"
import CarsTable from "../CarsTable"
import { CarType, api } from "@/api/car-rental-api"

describe("CarsTable Component", () => {
  beforeEach(() => {
    cy.stub(CarsTable, "useRouter")
      .as("useRouterStub")
      .returns({ pathname: "/", push: () => null, refresh: () => null })
    cy.mount(<CarsTable cars={mockCars as CarType[]} />)
  })

  it("Renders table correctly with car data", () => {
    mockCars.forEach((car) => {
      cy.contains(car.marca).should("exist")
      cy.contains(car.modelo).should("exist")
      cy.contains(car.year.toString()).should("exist")
      cy.contains(car.price.toString()).should("exist")
      cy.contains(car.km.toString()).should("exist")
      cy.contains(car.color).should("exist")
      cy.contains(car.ac ? "si" : "no").should("exist")
      cy.contains(car.pasajeros.toString()).should("exist")
      cy.contains(car.cambios).should("exist")
    })

    cy.contains(/estado/i)
    cy.contains(/marca/i)
    cy.contains(/modelo/i)
    cy.contains(/año/i)
    cy.contains(/precio\/dia/i)
    cy.contains(/km/i)
    cy.contains(/color/i)
    cy.contains(/ac/i)
    cy.contains(/pasajeros/i)
    cy.contains(/cambios/i)
    cy.contains(/edit/i)
    cy.contains(/delete/i)

    cy.get("td")
      .contains("Disponible")
      .parent()
      .should("not.have.css", "background-color", "rgb(211, 211, 211)")
    cy.get("td")
      .contains("Alquilado")
      .parent()
      .should("have.css", "background-color", "rgb(211, 211, 211)")
  })

  it("Handles delete action correctly", () => {
    cy.stub(api, "deleteCar").as("deleteCarStub").resolves({ ok: true })
    const deletedCar = mockCars[0]

    cy.intercept("DELETE", "*", (req) => {
      req.reply({})
    }).as("deleteRequest")

    cy.get("td").contains(deletedCar.marca).parent().find(".actionIcon").last().click()

    cy.get("@deleteCarStub").should("have.been.calledWith", deletedCar.id)
  })

  it("Handles edit action correctly", () => {
    const editedCar = mockCars[1]
    cy.get("td").contains(editedCar.marca).parent().find(".actionIcon").first().click()
    cy.get("@useRouterStub").should("have.been.called")
  })
})
