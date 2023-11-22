import { mockActiveTransactions, mockHistorialTransactions } from "@/app/mocks/mockData"
import TransactionsTable from "../TransactionsTable"
import { api } from "@/api/car-rental-api"

describe("TransactionsTable Component", () => {
  beforeEach(() => {
    cy.stub(TransactionsTable, "useRouter")
      .as("useRouterStub")
      .returns({ pathname: "/", push: () => null, refresh: () => null })

    cy.mount(<TransactionsTable transactions={mockActiveTransactions} />)
  })

  it("should render correctly with the passed transactions", () => {
    cy.get("tr").should("have.length", 2)
    cy.get("th").should("have.length", 9)
    cy.get("td").should("have.length", 9)

    const rowHeaders = [
      "marca",
      "modelo",
      "cliente",
      "documento",
      "precio/dia",
      "fecha inicio",
      "fecha fin",
      "edit",
      "done",
    ]

    rowHeaders.forEach((row) => {
      cy.contains(row)
    })

    mockActiveTransactions.forEach((item) => {
      cy.contains(item.car.marca)
      cy.contains(item.car.modelo)
      cy.contains(item.client.nombre + " " + item.client.apellido)
      cy.contains(item.client.nro_documento)
      cy.contains(item.price_per_day)
      cy.contains(new Date(item.start_date).toLocaleDateString("en-GB"))
      cy.contains(new Date(item.finish_date).toLocaleDateString("en-GB"))
    })
  })

  it("Handles finish transaction action correctly", () => {
    cy.stub(api, "finishTransaction").as("deleteClientStub").resolves({ ok: true })
    const transactionToFinish = mockActiveTransactions[0]

    cy.intercept("PATCH", "*", (req) => {
      req.reply({})
    }).as("patchRequest")

    cy.get("td")
      .contains(transactionToFinish.client.apellido)
      .parent()
      .find(".actionIcon")
      .last()
      .click()

    cy.get("@deleteClientStub").should("have.been.calledWith", transactionToFinish.id)
  })

  it("Handles edit action correctly", () => {
    const editedTrasaction = mockActiveTransactions[0]
    cy.get("td")
      .contains(editedTrasaction.client.apellido)
      .parent()
      .find(".actionIcon")
      .first()
      .click()
    cy.get("@useRouterStub").should("have.been.called")
  })
})

describe("TransactionsTable with no transactions", () => {
  it("empty list: should return a message when there are no transactions", () => {
    cy.stub(TransactionsTable, "useRouter")
      .as("useRouterStub")
      .returns({ pathname: "/", push: () => null, refresh: () => null })
    cy.mount(<TransactionsTable transactions={[]} />)

    cy.contains(/No transactions active/i)
  })
})
