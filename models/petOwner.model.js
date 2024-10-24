import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

// export const PetOwner = sequelize.define('PetOwner', {
//   personDocument: {
//     type: DataTypes.BIGINT,
//     primaryKey: true
//   }
// })

// Person.hasOne(PetOwner, {
//   foreignKey: 'personDocument',
//   sourceKey: 'Document'
// })

// PetOwner.belongsTo(Person, {
//   foreignKey: 'personDocument',
//   targetKey: 'Document'
// })

export const PetOwner = Person.extend();