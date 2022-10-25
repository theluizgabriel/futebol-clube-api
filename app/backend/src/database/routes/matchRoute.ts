import * as express from 'express';
import MatchController from '../controllers/match.controller';
import Matches from '../models/MatchesModel';
import MatchService from '../services/match.service';

const router = express.Router();

const teamController = new MatchController(new MatchService(Matches));

router.get('/', async (req, res) => { teamController.getMatches(req, res); });

export default router;
