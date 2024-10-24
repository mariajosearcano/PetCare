import { sequelize } from './database/connection.js'
import './models/person.model.js'
import './models/credential.model.js'
import './models/staff.model.js'
import './models/administrator.model.js'
import './models/student.model.js'
import './models/teacher.model.js'
import './models/enroll.model.js'
import './models/course.model.js'
import './models/enrollCourse.model.js'
import './models/courseSchedule.model.js'
import './models/califications.model.js'
import './models/classMaterial.model.js'
import './models/followUp.model.js'
import './models/assignment.model.js'
import { inserts } from './models/inserts.js'

try {
  await sequelize.sync({ force: true })
  await inserts()
} catch (error) {
  console.error('Error connecting to the database', error)
}