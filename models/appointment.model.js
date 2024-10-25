import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Veterinarian } from './veterinarian.model.js'
import { Pet } from './pet.model.js'

export const Appointment = sequelize.define('Appointment', {
  appointmentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
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

Veterinarian.hasMany(Appointment,{
  foreignKey: {
      name: 'veterinarianId',
      allowNull: false
  }
})
Appointment.belongsTo(Veterinarian, {
  foreignKey: {
    name: 'veterinarianId',
    allowNull: false
  }
})

Pet.hasMany(Appointment,{
  foreignKey: {
    name: 'petId',
    allowNull: false
  }
})
Appointment.belongsTo(Pet, {
  foreignKey: {
    name: 'petId',
    allowNull: false
  }
})

