import * as chaiImport from "chai";

import sinon from "sinon";


import { faker } from "@faker-js/faker";

//import {loginRouter, connectToDatabase} from "../backend/server.js";
import chaiHttp from 'chai-http';

import "mocha";
import {createJSONFromCredentials, checkForCredentialWithinList} from './test.utils.js' 
import { timeout } from "rxjs";

const chai = chaiImport.use(chaiHttp);
const expect = chai.expect;

describe("Database", function() {
  const stubCredentials = {
    id: faker.string.numeric(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  describe("Create User", () => {
    it("should add a new user to the db",async function () {
      this.timeout(10000);
      var reqObj = createJSONFromCredentials(stubCredentials.email, stubCredentials.name, stubCredentials.password);

      var req1 = chai.request("http://localhost:5200")
      .post('/login')
      .send(reqObj)
      .end(function(err,res)
      {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.equal(201);
      });
      await new Promise(r => setTimeout(r, 2000));
      chai.request("http://localhost:5200")
      .get('/login')
      .send()
      .end(function(err,res)
      {
        //expect(err).to.be.null;
        expect(checkForCredentialWithinList(res.body,stubCredentials.email, stubCredentials.name, stubCredentials.password)).to.be.true;
      })
    });
  });
});




