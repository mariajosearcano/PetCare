import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('db-petcare', 'admin-petcare', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
})