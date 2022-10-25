export interface ILogin {
  email: string;
  password: string;
}

export interface ITeams {
  [index: number]: {
    id: number;
    teamName: string;
  }
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
