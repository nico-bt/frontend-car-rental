import { mockCars, mockClients } from "@/app/mocks/mockData"
import CarsTable from "../CarsTable"
import { ClientType, api } from "@/api/car-rental-api"
import ClientsTable from "../ClientsTable"

describe("ClientsTable Component", () => {
  beforeEach(() => {
    cy.stub(ClientsTable, "useRouter")
      .as("useRouterStub")
      .returns({ pathname: "/", push: () => null, refresh: () => null })
    cy.mount(<ClientsTable clients={mockClients as ClientType[]} />)
  })

  it("Renders table correctly with clients data", () => {
    mockClients.forEach((client) => {
      cy.contains(client.nombre).should("exist")
      cy.contains(client.apellido).should("exist")
      cy.contains(client.tipo_documento).should("exist")
      cy.contains(client.nro_documento).should("exist")
      cy.contains(client.nacionalidad).should("exist")
      cy.contains(client.direccion).should("exist")
      cy.contains(client.telefono).should("exist")
      cy.contains(client.email).should("exist")
      cy.contains(new Date(client.fecha_nacimiento).toLocaleDateString("en-GB")).should("exist")
    })

    cy.contains(/alquilando/i)
    cy.contains(/nombre/i)
    cy.contains(/apellido/i)
    cy.contains(/tipo doc/i)
    cy.contains(/nro doc/i)
    cy.contains(/nacionalidad/i)
    cy.contains(/direccion/i)
    cy.contains(/telefono/i)
    cy.contains(/email/i)
    cy.contains(/nacimiento/i)
    cy.contains(/edit/i)
    cy.contains(/delete/i)

    cy.get("tr").should("have.length", 3)
    cy.get("th").should("have.length", 12)
    cy.get("td").should("have.length", 24)
  })

  it("Handles delete action correctly", () => {
    cy.stub(api, "deleteClient").as("deleteClientStub").resolves({ ok: true })
    const deletedClient = mockClients[0]

    cy.intercept("DELETE", "*", (req) => {
      req.reply({})
    }).as("deleteRequest")

    cy.get("td").contains(deletedClient.apellido).parent().find(".actionIcon").last().click()

    cy.get("@deleteClientStub").should("have.been.calledWith", deletedClient.id)
  })

  it("Handles edit action correctly", () => {
    const editedClient = mockClients[1]
    cy.get("td").contains(editedClient.apellido).parent().find(".actionIcon").first().click()
    cy.get("@useRouterStub").should("have.been.called")
  })
})

describe("ClientsTable with no clients", () => {
  it("empty list: should return a message when there are no clients", () => {
    cy.stub(ClientsTable, "useRouter")
      .as("useRouterStub")
      .returns({ pathname: "/", push: () => null, refresh: () => null })
    cy.mount(<ClientsTable clients={[]} />)

    cy.contains(/No clients added/i)
  })
})
