import * as express from 'express';
import MatchController from '../controllers/match.controller';
import Matches from '../models/MatchesModel';
import MatchService from '../services/match.service';

const router = express.Router();

const teamController = new MatchController(new MatchService(Matches));

router.get('/', async (req, res) => {
  const { inProgress } = req.query;
  if (inProgress) {
    teamController.getMatchesByQuery(req, res);
  } else {
    teamController.getMatches(req, res);
  }
});

export default router;
