import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Administrator = sequelize.define('Administrator', {
    document: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: true
        }
    }
})

Person.hasOne(Administrator, {
  foreignKey: 'document',
})

Administrator.belongsTo(Person, {
  foreignKey: 'document',
})
