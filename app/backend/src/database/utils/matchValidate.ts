import { NextFunction, Request, Response } from 'express';
import Teams from '../models/TeamsModel';
import TeamService from '../services/team.service';

const teamService = new TeamService(Teams);

function validateDifferentTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
}

async function validateTeamsExist(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  const teamHome = await teamService.getTeamById(homeTeam);
  const teamAway = await teamService.getTeamById(awayTeam);

  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}

export {
  validateDifferentTeams,
  validateTeamsExist,
};
