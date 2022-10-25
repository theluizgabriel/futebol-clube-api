import * as express from 'express';
import TeamController from '../controllers/team.controller';
import Teams from '../models/TeamsModel';
import TeamService from '../services/team.service';

const router = express.Router();

const teamController = new TeamController(new TeamService(Teams));

router.get('/', async (req, res) => { teamController.getTeams(req, res); });
router.get('/:id', async (req, res) => { teamController.getTeamById(req, res); });

export default router;
