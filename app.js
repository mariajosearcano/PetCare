import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { studentRouters } from './routes/student.routes.js'
import { teacherRouters } from './routes/teacher.routes.js'
import { staffRouters } from './routes/staff.routes.js'
import { assignmentRouters } from './routes/assignment.routes.js'
import { courseRouters } from './routes/course.routes.js'
import { classMaterialRouters } from './routes/classMaterial.routes.js'
import { courseScheduleRouters } from './routes/courseSchedule.routes.js'
import { enrollRouters } from './routes/enroll.routes.js'
import { enrollCourseRouters } from './routes/enrollCourse.routes.js'
import { credentialRouters } from './routes/crdential.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use(studentRouters)
app.use(teacherRouters)
app.use(staffRouters)
app.use(assignmentRouters)
app.use(courseRouters)
app.use(classMaterialRouters)
app.use(courseScheduleRouters)
app.use(enrollRouters)
app.use(enrollCourseRouters)
app.use(credentialRouters)
