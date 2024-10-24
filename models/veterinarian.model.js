import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

// export const Veterinarian = sequelize.define('Veterinarian', {
//   personDocument: {
//     type: DataTypes.BIGINT,
//     primaryKey: true
//   }
// })

// Person.hasOne(Veterinarian, {
//   foreignKey: 'personDocument',
//   sourceKey: 'Document'
// })

// Veterinarian.belongsTo(Person, {
//   foreignKey: 'personDocument',
//   targetKey: 'Document'
// })

export const Veterinarian = Person.extend();