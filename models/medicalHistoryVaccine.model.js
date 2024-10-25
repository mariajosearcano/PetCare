import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { MedicalHistory } from './medicalHistory.model.js'
import { Vaccine } from './vaccine.model.js'

export const MedicalHistoryVaccine = sequelize.define('MedicalHistoryVaccine', {
  medicalHistoryVaccineId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
    medicalHistoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: MedicalHistory,
        key: 'medicalHistoryId',
      },
    },
    vaccineId: {
      type: DataTypes.INTEGER,
      references: {
        model: Vaccine,
        key: 'vaccineId',
      },
    },
});

MedicalHistory.belongsToMany(Vaccine, { 
    through: MedicalHistoryVaccine 
});
Vaccine.belongsToMany(MedicalHistory, { 
    through: MedicalHistoryVaccine 
});