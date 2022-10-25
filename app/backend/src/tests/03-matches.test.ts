// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
import {mockMatches} from './mockMatches'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
    it('Requisição GET para ver time com id especifico', async () => {
        const httpResponse = await chai.request(app)
    .get('/matches')
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.eq(mockMatches)
    })
});