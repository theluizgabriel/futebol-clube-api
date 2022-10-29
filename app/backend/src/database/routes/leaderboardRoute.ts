import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const router = express.Router();

const leaderboardController = new LeaderboardController(new LeaderboardService());

router.get('/home', async (req, res) => { leaderboardController.getTableHome(req, res); });
router.get('/away', async (req, res) => { leaderboardController.getTableAway(req, res); });
router.get('/', async (req, res) => { leaderboardController.getCompleteTable(req, res); });

export default router;
