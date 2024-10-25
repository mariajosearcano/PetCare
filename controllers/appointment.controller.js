import { Appointment } from '../models/appointment.model.js'
import { Veterinarian } from '../models/veterinarian.model.js'
import { Pet } from '../models/pet.model.js'

export class AppointmentController {
  getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.findAll({
        include: [{
          model: Veterinarian,
          include: [{ model: Pet }]
        }]
      })
      res.status(200).json(appointments)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createAppointment = async (req, res) => {
    try {
      const { appointmentId, date, startTime, endTime, veterinarianId, petId } = req.body
      const appointment = await Appointment.findOne({ where: { appointmentId, date, startTime, endTime, veterinarianId, petId } })
      if (!appointment) {
        const newAppointment = await Appointment.create(req.body, {
          include: [{
            model: Veterinarian,
            include: [{ model: Pet }]
          }]
        })
        return res.status(201).json(newAppointment)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.params
      const appointment = await Appointment.findByPk(appointmentId, {
        include: [{
          model: Veterinarian,
          include: [{ model: Pet }]
        }]
      })
      if (appointment) {
        res.json(appointment)
      } else {
        res.status(404).json({ err: 'Appointment not found' })
      }
      res.status(200).json(appointment)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.params
      await Appointment.destroy({
        where: {
          appointmentId
        }
      })
      res.json({ msg: 'Appointment  deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.params
      const appointment = await Appointment.findByPk(appointmentId)
      appointment.set(req.body)
      await appointment.save()
      res.status(202).json(appointment)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

