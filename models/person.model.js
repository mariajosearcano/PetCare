import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Person = sequelize.define('Person', {
  document: {
    type: DataTypes.BIGINT,
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
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{3}-\d{3}-\d{4}$/i
    }
  }
})
