import { Router } from 'express'
import { Appointment } from '../controllers/appointment.controller.js'

const appointmentController = new AppointmentController()
export const appointmentRouters = Router()

appointmentRouters.get('/api/appointment', appointmentController.getAllAppointments)
appointmentRouters.post('/api/appointment', appointmentController.createAssignment)
appointmentRouters.get('/api/appointment/:asId', appointmentController.getAssignment)
appointmentRouters.put('/api/appointment/:asId', appointmentController.updateAssignment)
appointmentRouters.delete('/api/appointment/:asId', appointmentController.deleteAssignment)