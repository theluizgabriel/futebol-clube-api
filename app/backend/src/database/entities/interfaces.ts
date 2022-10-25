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
