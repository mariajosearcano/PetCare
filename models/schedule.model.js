import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Veterinarian } from './veterinarian.model.js'

export const Schedule = sequelize.define('Schedule', {
  scheduleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
})

Veterinarian.hasMany(Schedule, {
  foreignKey: {
      name: 'veterinarianId',
      allowNull: false
  }
})
Schedule.belongsTo(Veterinarian, {
  foreignKey: {
    name: 'veterinarianId',
    allowNull: false
  }
})


