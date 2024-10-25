import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Pet } from './pet.model.js'

export const MedicalHistory = sequelize.define('MedicalHistory', {
  medicalHistoryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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

Pet.hasOne(MedicalHistory, {
  foreignKey: {
    name: 'petId',
    allowNull: false
  }
})
MedicalHistory.belongsTo(Pet, {
  foreignKey: {
    name: 'petId',
    allowNull: false
  }
}
)