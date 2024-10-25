import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const PetOwner = sequelize.define('PetOwner', {
    document: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: true
        }
    }
})

Person.hasOne(PetOwner, {
  foreignKey: 'document',
  allowNull: false
})

PetOwner.belongsTo(Person, {
  foreignKey: 'document',
  allowNull: false
})
