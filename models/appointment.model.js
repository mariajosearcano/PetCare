import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Veterinarian } from './veterinarian.model.js'
import { Pet } from './pet.model.js'

export const Appointment = sequelize.define('Appointment', {
  appointmentId: {
    type: DataTypes.SERIAL,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s!@#$%^&*()_-+=\[\]{}|;:'",.<>/?]+$/i
    }
  }
})