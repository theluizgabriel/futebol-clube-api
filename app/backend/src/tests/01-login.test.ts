// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /login', () => {

  it('Requisição feita com sucesso deve retornar status 200', async () => {
    const httpResponse = await chai.request(app).get('/')
    expect(httpResponse.status).to.be.eq(200);
  });
});
