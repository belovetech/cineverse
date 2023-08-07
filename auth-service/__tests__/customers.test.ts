import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import config from "../src/config";

chai.use(chaiHttp);

describe("Customer Endpoint Testing", function () {
  const url = config.api_Url || "http://localhost:8000/v1";

  const data = {
    firstName: "Unit",
    lastName: "Test",
    email: "unitest@gmail.com",
    password: "P@ssw0rd!",
    passwordConfirm: "P@ssw0rd!",
  };
  let id;

  // [POST] request
  describe("[POST] Create a new customer", function () {
    it("Create a new customer", async function () {
      const res = await chai.request(url).post("/customers").send(data);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("links");
      expect(res.body).to.have.property("email").to.equal(data.email);
      expect(res.body).to.have.property("isVerified").to.equal(false);
      id = res.body.customerId; // store customer id
    });

    it("Customer already exists", async function () {
      const errorMessage = "Conflict:: Customer already exists.";
      const res = await chai.request(url).post("/customers").send(data);
      expect(res.status).to.be.equal(409);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("error").to.equal(errorMessage);
      expect(res.body).to.have.property("name").to.equal("ConflictException");
    });

    it("Invalid request payload", async function () {
      const emptyData = {};
      const res = await chai.request(url).post("/customers").send(emptyData);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.be.an("array");
      expect(res.body.errors[0]).to.have.property("firstName");
      expect(res.body.errors[1]).to.have.property("lastName");
      expect(res.body.errors[2]).to.have.property("email");
      expect(res.body.errors[3]).to.have.property("password");
      expect(res.body).to.have.property("name").to.equal("ValidationException");
    });
  });

  // [GET] request
  describe("[GET] get customer", function () {
    it("Get customer by id", async function () {
      const res = await chai.request(url).get(`/customers/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("email");
      expect(res.body).to.have.property("links");
      expect(res.body).to.have.property("customerId");
      expect(res.body).to.have.property("isVerified");
      expect(res.body).to.not.have.property("password");
    });

    it("Get all customers", async function () {
      const res = await chai.request(url).get("/customers");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  // [UPDATE] request
  describe("[UPDATE] get customer", function () {
    it("Update customer data", async function () {
      const data = { firstName: "Karl", lastName: "Mark" };
      const keys = ["customerId", "firstName", "lastName", "email", "isVerified"];
      const res = await chai.request(url).patch(`/customers/${id}`).send(data);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("firstName").deep.equal(data.firstName);
      expect(res.body).to.have.property("lastName").deep.equal(data.lastName);
      expect(res.body).to.include.all.keys(...keys);
    });

    it("Update password or email using wrong endpoint", async function () {
      const data = { email: "Karl@email.com", password: "Mark123" };
      const res = await chai.request(url).patch(`/customers/${id}`).send(data);
      expect(res.status).to.equal(400);
      expect(res.body.name).to.equal("BadRequestException");
    });
  });

  // [DELETE] request
  describe("[DELETE] delete customer", function () {
    it("Delete customer by id", async function () {
      const res = await chai.request(url).delete(`/customers/${id}`);
      expect(res.status).to.equal(204);
    });

    it("Delete customer by wrong id", async function () {
      const res = await chai.request(url).delete(`/customers/${id}`);
      expect(res.status).to.equal(404);
      expect(res.body.name).to.equal("NotFoundException");
    });
  });
});
