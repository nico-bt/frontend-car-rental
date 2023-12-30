import { mockHistorialTransactions } from "@/app/mocks/mockData"
import HistorialTable from "../HistorialTable"
import { TransactionType } from "@/api/car-rental-api"

describe("Historial Table Component", () => {
  it("should render correctly with the passed transactions", () => {
    cy.mount(<HistorialTable transactions={mockHistorialTransactions as TransactionType[]} />)

    cy.get("tr").should("have.length", 3)
    cy.get("th").should("have.length", 8)
    cy.get("td").should("have.length", 16)

    const rowHeaders = [
      "marca",
      "modelo",
      "cliente",
      "documento",
      "precio/dia",
      "fecha inicio",
      "fecha fin",
      "estado",
    ]

    rowHeaders.forEach((row) => {
      cy.contains(row)
    })

    mockHistorialTransactions.forEach((item) => {
      cy.contains(item.car.marca)
      cy.contains(item.car.modelo)
      cy.contains(item.client.nombre + " " + item.client.apellido)
      cy.contains(item.client.nro_documento)
      cy.contains(item.price_per_day)
      cy.contains(new Date(item.start_date).toLocaleDateString("en-GB"))
      cy.contains(new Date(item.finish_date).toLocaleDateString("en-GB"))
    })

    cy.get("td")
      .contains(mockHistorialTransactions[0].car.marca)
      .parent()
      .should("not.have.css", "background-color", "rgb(242, 248, 242)")
    cy.get("td")
      .contains(mockHistorialTransactions[1].car.marca)
      .parent()
      .should("have.css", "background-color", "rgb(242, 248, 242)")
  })
})

describe("HistorialTable with no transactions", () => {
  it("empty list: should return a message when there are no transactions", () => {
    cy.mount(<HistorialTable transactions={[]} />)

    cy.contains(/No transactions active/i)
  })
})
