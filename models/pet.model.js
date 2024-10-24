import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { PetOwner } from './petOwner.model.js'

export const Pet = sequelize.define('Pet', {
  petId: {
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
  },
  specie: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d+$/i
    }
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d+(\.\d{1,2})?$/i
    }
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: false,
  }
})

PetOwner.hasMany(Pet, {
  foreignKey: {
    name: 'document'
  }
})
Pet.belongsTo(PetOwner)

