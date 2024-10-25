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
      const { medicalHistoryId, vaccineId } = req.body
      const medicalHistoryVaccine = await MedicalHistoryVaccine.findOne({ where: { medicalHistoryId, vaccineId } })
      if (!medicalHistoryVaccine) {
        const newMedicalHistoryVaccine = await MedicalHistoryVaccine.create(req.body, {
          include: [{
              model: MedicalHistory,
              include: [{ model: Vaccine }]
          }]
        })
        return res.status(201).json(newMedicalHistoryVaccine)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getMedicalHistoryVaccine = async (req, res) => {
    try {
      const { medicalHistoryVaccineId } = req.params
      const medicalHistoryVaccine = await MedicalHistoryVaccine.findByPk(medicalHistoryVaccineId, {
        include: [{
          model: MedicalHistory,
          include: [{ model: Vaccine }]
        }]
      })
      if (medicalHistoryVaccine) {
        res.json(medicalHistoryVaccine)
      } else {
        res.status(404).json({ err: 'Medical History Vaccine not found' })
      }
      res.status(200).json(medicalHistoryVaccine)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateMedicalHistoryVaccine = async (req, res) => {
    try {
      const { medicalHistoryId, vaccineId } = req.params
      const { approved } = req.body

      const medicalHistoryVaccine = await MedicalHistoryVaccine.findOne({
        where: { medicalHistoryId, vaccineId }
      })

      if (!medicalHistoryVaccine) {
        return res.status(404).json({ message: 'Medical History Vaccine not found' })
      }

      medicalHistoryVaccine.approved = approved
      await medicalHistoryVaccine.save()

      res.status(200).json(medicalHistoryVaccine)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteMedicalHistoryVaccine = async (req, res) => {
    try {
      const { medicalHistoryId, vaccineId } = req.params

      const medicalHistoryVaccine = await MedicalHistoryVaccine.findOne({
        where: { medicalHistoryId, vaccineId }
      })

      if (!medicalHistoryVaccine) {
        return res.status(404).json({ message: 'Medical History Vaccine not found or inactive' })
      }

      await MedicalHistoryVaccine.destroy({
        where: { medicalHistoryId, vaccineId }
      })

      res.status(204).send()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
