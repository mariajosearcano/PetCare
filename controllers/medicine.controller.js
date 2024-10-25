import { Medicine } from '../models/medicine.model.js'

export class MedicineController {
  getAllMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.findAll()
      res.status(200).json(medicines)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createMedicine = async (req, res) => {
    try {
      const { medicineId, name } = req.body
      const medicine = await Medicine.findOne({ 
        where: { medicineId, name } 
       })
      if (!medicine) {
        const newMedicine = await Medicine.create(req.body)
        return res.status(201).json(newMedicine)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getMedicine = async (req, res) => {
    try {
      const { medicineId } = req.params
      const medicine = await Medicine.findByPk(medicineId)
      if (medicine) {
        res.json(medicine)
      } else {
        res.status(404).json({ err: 'Medicine not found' })
      }
      res.status(200).json(medicine)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteMedicine = async (req, res) => {
    try {
      const { medicineId } = req.params
      await Medicine.destroy({
        where: {
          medicineId
        }
      })
      res.json({ message: 'Medicine  deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateMedicine = async (req, res) => {
    try {
      const { medicineId } = req.params
      const medicine = await Medicine.findByPk(medicineId)
      medicine.set(req.body)
      await medicine.save()
      res.status(202).json(medicine)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}