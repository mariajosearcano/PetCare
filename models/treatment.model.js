import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Medicine } from './medicine.model.js'
import { MedicalHistory } from './medicalHistory.model.js'

export const Treatment = sequelize.define('Treatment', {
  treatmentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s!@#$%^&*()_-+=\[\]{}|;:'",.<>/?]+$/i
    }
  }
})

Medicine.hasMany(Treatment,{
    foreignKey: {
        name: 'medicineId',
    }
})
Treatment.belongsTo(Medicine)

MedicalHistory.hasMany(Treatment,{
  foreignKey: {
      name: 'medicalHistoryId',
  }
})
Treatment.belongsTo(MedicalHistory)