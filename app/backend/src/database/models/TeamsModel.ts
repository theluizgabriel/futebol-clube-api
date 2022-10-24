import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

MatchesModel.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home' });
MatchesModel.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away' });

Teams.hasMany(MatchesModel, { foreignKey: 'id', as: 'home' });
Teams.hasMany(MatchesModel, { foreignKey: 'id', as: 'away' });

export default Teams;
