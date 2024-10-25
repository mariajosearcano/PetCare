import { MedicalHistory } from '../models/medicalHistory.model.js'
import { Pet } from '../models/pet.model.js'

export class MedicalHistoryController {
  getAllMedicalHistories = async (req, res) => {
    try {
      const medicalHistories = await MedicalHistory.findAll({
        include: [{
          model: Pet
        }]
      })
      res.status(200).json(medicalHistories)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createMedicalHistory = async (req, res) => {
    try {
      const { medicalHistoryId, diagnosis, petId } = req.body
      const medicalHistory = await MedicalHistory.findOne({ where: { medicalHistoryId, diagnosis, petId } })
      if (!medicalHistory) {
        const newMedicalHistory = await MedicalHistory.create(req.body, {
          include: [{
            model: Pet
          }]
        })
        return res.status(201).json(newMedicalHistory)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getMedicalHistory = async (req, res) => {
    try {
      const { medicalHistoryId } = req.params
      const medicalHistory = await MedicalHistory.findByPk(medicalHistoryId, {
        include: [{
          model: Pet
        }]
      })
      if (medicalHistory) {
        res.json(medicalHistory)
      } else {
        res.status(404).json({ err: 'Medical History not found' })
      }
      res.status(200).json(medicalHistory)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteMedicalHistory = async (req, res) => {
    try {
      const { medicalHistoryId } = req.params
      await MedicalHistory.destroy({
        where: {
          medicalHistoryId
        }
      })
      res.json({ message: 'Medical History deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateMedicalHistory = async (req, res) => {
    try {
      const { medicalHistoryId } = req.params
      const medicalHistory = await MedicalHistory.findByPk(medicalHistoryId)
      medicalHistory.set(req.body)
      await medicalHistory.save()
      res.status(202).json(medicalHistory)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
