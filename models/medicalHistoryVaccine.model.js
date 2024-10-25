import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { MedicalHistory } from './medicalHistory.model.js'
import { Vaccine } from './vaccine.model.js'

export const MedicalHistoryVaccine = sequelize.define('MedicalHistoryVaccine', {
    medicalHistoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      references: {
        model: MedicalHistory,
        key: 'medicalHistoryid',
      },
    },
    vaccineId: {
      type: DataTypes.SERIAL,
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