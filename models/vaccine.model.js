import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Vaccine = sequelize.define('Vaccine', {
  vaccineId: {
    type: DataTypes.SERIAL,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  }
})

