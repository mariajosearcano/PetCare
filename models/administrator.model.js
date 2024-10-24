import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

// export const Administrator = sequelize.define('Administrator', {
//   personDocument: {
//     type: DataTypes.BIGINT,
//     primaryKey: true
//   }
// })

// Person.hasOne(Administrator, {
//   foreignKey: 'personDocument',
//   sourceKey: 'Document'
// })

// Administrator.belongsTo(Person, {
//   foreignKey: 'personDocument',
//   targetKey: 'Document'
// })

export const Administrator = Person.extend();