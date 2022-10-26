import * as express from 'express';
import MatchController from '../controllers/match.controller';
import Matches from '../models/MatchesModel';
import MatchService from '../services/match.service';
import { validateToken, validateTokenExists } from '../utils/tokenValidate';
import { validateDifferentTeams, validateTeamsExist } from '../utils/matchValidate';

const router = express.Router();

const matchController = new MatchController(new MatchService(Matches));

router.get('/', async (req, res) => {
  const { inProgress } = req.query;
  if (inProgress) {
    matchController.getMatchesByQuery(req, res);
  } else {
    matchController.getMatches(req, res);
  }
});

router.post(
  '/',
  validateToken,
  validateTokenExists,
  validateDifferentTeams,
  validateTeamsExist,
  async (req, res) => { matchController.createMatch(req, res); },
);
router.patch('/:id/finish', async (req, res) => { matchController.finishMatch(req, res); });

export default router;
