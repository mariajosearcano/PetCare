import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Medicine = sequelize.define('Medicine', {
  medicineId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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