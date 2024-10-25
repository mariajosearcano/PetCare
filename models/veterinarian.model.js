import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Veterinarian = sequelize.define('Veterinarian', {
    document: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: true
        }
    }
})

Person.hasOne(Veterinarian, {
  foreignKey: 'document',
})

Veterinarian.belongsTo(Person, {
  foreignKey: 'document',
})


