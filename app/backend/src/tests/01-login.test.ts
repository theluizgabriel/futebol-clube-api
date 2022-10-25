// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2NjYyMDgyfQ.3AOuUvTLSIWD6iq7MxMXtzFmi53ERH1U3SNxIAmpeMw'

describe('Teste da rota /login', () => {
  it('Campo email ou password não é informado, o status deve ser 400', async () => {
    const httpResponse = await chai
    .request(app)
    .post('/login')
    .send({ password: '123456' })
    expect(httpResponse.status).to.be.eq(400)
    expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" })
  });
  it('Campo email ou password não consta no banco de dados(invalido), o status deve ser 401', async () => {
    const httpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: '258569' })
    expect(httpResponse.status).to.be.eq(401)
    expect(httpResponse.body).to.deep.equal({ message: "Incorrect email or password" })
  });
  it('Requisição para logar com dados corretos', async () => {
    const httpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })
    expect(httpResponse.status).to.be.eq(200);
  });
});

describe('Teste da rota /login/validate', () => {
  it('Requisição GET com token vazio para saber o Role do usuario, deve retornar um erro', async () => {
    const httpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', '')
    expect(httpResponse.status).to.be.eq(401);
    expect(httpResponse.body).to.be.eq({ message: 'Unauthorized' })
  });
  it('Requisição GET com token valido para saber o Role do usuario', async () => {
    const httpResponse = await chai.request(app)
    .get('/login/validate')
    .set('Authorization', token)
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq({ role: "admin" })
  });
});
