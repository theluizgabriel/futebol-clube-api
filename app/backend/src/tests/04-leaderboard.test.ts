// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { mockLeaderboardAway, mockLeaderboardHome } from './mockLeaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /leaderboard/home', () => {
  it('Tabela Home', async () => {
    const httpResponse = await chai
    .request(app)
    .get('/leaderboard/home')
    expect(httpResponse.status).to.be.eq(200)
    expect(httpResponse.body).to.deep.equal(mockLeaderboardHome)
  });

  it('Tabela Away', async () => {
    const httpResponse = await chai
    .request(app)
    .get('/leaderboard/away')
    expect(httpResponse.status).to.be.eq(200)
    expect(httpResponse.body).to.deep.equal(mockLeaderboardAway)
  });
});
