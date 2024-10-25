import { MedicalHistoryVaccine } from '../models/medicalHistoryVaccine.model.js'
import { MedicalHistory } from '../models/medicalHistory.model.js'
import { Vaccine } from '../models/vaccine.model.js'

export class MedicalHistoryVaccineController {
  getAllMedicalHistoryVaccines = async (req, res) => {
    try {
      const medicalHistoryVaccine = await MedicalHistoryVaccine.findAll({
        include: [{
            model: MedicalHistory,
            include: [{ model: Vaccine }]
        }]
      })
      res.status(200).json(medicalHistoryVaccine)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createMedicalHistoryVaccine = async (req, res) => {
    try {
      const { medicalHistoryVaccineId, vaccineId } = req.body

      const studentEnroll = await Enroll.findOne({ where: { studentId, status: 'ACTIVE' } })
      if (studentEnroll) {
        return res.status(404).json({ message: 'Student has already enroll' })
      }
      const newEnroll = await Enroll.create({
        studentId
      })

      const enrollments = await Promise.all(
        courses.map(async (courseId) => {
          return await EnrollCourse.create({
            enrollID: newEnroll.enrollID,
            courseId,
            approved: false
          })
        })
      )

      res.status(201).json(enrollments)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getEnrolledCoursesWithSchedule = async (req, res) => {
    try {
      const { studentId } = req.params

      const studentEnroll = await Enroll.findOne({
        where: { studentId, status: 'ACTIVE' }
      })

      if (!studentEnroll) {
        return res.status(404).json({ message: 'Student not found or inactive' })
      }

      const enrollments = await EnrollCourse.findAll({
        where: { enrollID: studentEnroll.enrollID },
        include: [
          {
            model: Course,
            include: [
              {
                model: CourseSchedule,
                attributes: ['day', 'startTime', 'endTime', 'room']
              },
              {
                model: Assignment,
                attributes: ['name', 'semester']
              }
            ]
          }
        ]
      })

      const response = enrollments.map(enrollment => ({
        courseId: enrollment.courseId,
        approved: enrollment.approved,
        schedules: enrollment.Course.CourseSchedules,
        subjectName: enrollment.Course.Assignment?.name
      }))

      res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateEnrollCourse = async (req, res) => {
    try {
      const { studentId, courseId } = req.params
      const { approved } = req.body

      const enrollCourse = await EnrollCourse.findOne({
        where: { studentId, courseId }
      })

      if (!enrollCourse) {
        return res.status(404).json({ message: 'EnrollCourse no encontrado' })
      }

      enrollCourse.approved = approved
      await enrollCourse.save()

      res.status(200).json(enrollCourse)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteEnrollCourse = async (req, res) => {
    try {
      const { studentId, courseId } = req.params

      const studentEnroll = await Enroll.findOne({
        where: { studentId, status: 'ACTIVE' }
      })

      if (!studentEnroll) {
        return res.status(404).json({ message: 'Student not found or inactive' })
      }

      const enrollCourse = await EnrollCourse.findOne({
        where: { enrollID: studentEnroll.enrollID, courseId }
      })

      if (!enrollCourse) {
        return res.status(404).json({ message: 'EnrollCourse not found' })
      }

      await enrollCourse.destroy()
      res.status(204).send()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  setAllEnrollsInactive = async (req, res) => {
    try {
      const [numberOfAffectedRows] = await Enroll.update(
        { status: 'INACTIVE' },
        { where: { status: 'ACTIVE' } }
      )

      if (numberOfAffectedRows === 0) {
        return res.status(404).json({ message: 'No active enrollments found' })
      }

      res.status(200).json({ message: 'All active enrollments have been set to INACTIVE' })
    } catch (error) {
      console.error('Error setting enrollments inactive:', error)
      return res.status(500).json({ message: 'Failed to set enrollments to INACTIVE', error: error.message })
    }
  }
}
