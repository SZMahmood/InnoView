import "chai";
import sinon from "sinon";

import { faker } from "@faker-js/faker";
import {loginRouter, connectToDatabase} from "../backend/server.js";
import chaiHttp from 'chai-http';
import "mocha";
import { expect } from "chai";
import './test.utils.ts' 

chai.use(chaiHttp);


describe("Database", function() {
  const stubCredentials = {
    id: faker.string.numeric(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  describe("create", function() {
    it("should add a new user to the db", async function(done) {
      var reqObj = createJSONFromCredentials(stubCredentials.email, stubCredentials.name, stubCredentials.password);
      await chai.request("http://localhost:8080")
      .post('/')
      .send(reqObj)
      .end(function(err,res)
      {
        expect(err).to.be.null;
        expect(res).to.be.equal(404);
      });

      chai.request("http://localhost:8080")
      .get('/')
      .send()
      .end(function(err,res)
      {
        expect(err).to.be.null;
        expect(res).to.contain(reqObj)
      })
    });
  });
});




