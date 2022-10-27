// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
import {mockFalseMatches, mockMatches, mockTrueMatches, responseCreateMatch,
    createMatch, cMatchEqualTeams, cMatchTeamNotExist} from './mockMatches'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2NjYyMDgyfQ.3AOuUvTLSIWD6iq7MxMXtzFmi53ERH1U3SNxIAmpeMw'


describe('Teste da rota /matches', () => {
    it('Requisição GET para ver todas as partidas', async () => {
        const httpResponse = await chai.request(app)
    .get('/matches')
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq(mockMatches)
    })
    it('Requisição GET para ver todas as partidas em andamento', async () => {
        const httpResponse = await chai.request(app)
    .get('/matches')
    .query({inProgress: true})
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq(mockTrueMatches)
    })
    it('Requisição GET para ver todas as partidas que ja terminaram', async () => {
        const httpResponse = await chai.request(app)
    .get('/matches')
    .query({inProgress: false})
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq(mockFalseMatches)
    })

    describe('Testes de criacao de partidas', () => {
    it('Requisição POST para criar novas partidas com times iguais, status 422', async () => {
        const httpResponse = await chai.request(app)
    .post('/matches')
    .send(cMatchEqualTeams)
    .set('Authorization', token)
    expect(httpResponse.status).to.be.eq(422);
    expect(httpResponse.body).to.be.eq({ message: 'It is not possible to create a match with two equal teams' })
    })
    it('Requisição POST para criar novas partidas com time inexistente, status 404', async () => {
        const httpResponse = await chai.request(app)
    .post('/matches')
    .send(cMatchTeamNotExist)
    .set('Authorization', token)
    expect(httpResponse.status).to.be.eq(404);
    expect(httpResponse.body).to.be.eq({ message: 'There is no team with such id!' })
    })
    it('Requisição POST para criar novas partidas, status 200', async () => {
        const httpResponse = await chai.request(app)
    .post('/matches')
    .send(createMatch)
    .set('Authorization', token)
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq(responseCreateMatch)
    })
})

    it('Requisição PATCH para finalizar partidas em andamento', async () => {
        const httpResponse = await chai.request(app)
    .patch('/matches/48/finish')
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq({"message": "Finished"})
    })
    it('Requisição PATCH para mudar o resultado de partidas em andamento', async () => {
        const httpResponse = await chai.request(app)
    .patch('/matches/')
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq({"message": "Finished"})
    })
});