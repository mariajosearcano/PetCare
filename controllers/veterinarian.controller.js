import { Veterinarian } from '../models/veterinarian.model.js'
import { Person } from '../models/person.model.js'

export class VeterinarianController {
  getAllVeterinarians = async (req, res) => {
    try {
      const veterinarians = await Veterinarian.findAll({
        include: [{
          model: Person,
        }]
      })
      res.json(veterinarians)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting veterinarians' })
    }
  }

  createVeterinarian = async (req, res) => {
    try {
      const { document, name, lastName, email, phoneNumber } = req.body
      const id = document
      const person = await Person.findByPk(id)
      if (!person) {
        const newPerson = await Person.create({
          document: id,
          name,
          lastName,
          email,
          phoneNumber
        })
        await Veterinarian.create({ document: id })
        return res.status(201).json({ newPerson })
      }
      return res.status(400).json({ message: 'Account already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getVeterinarian = async (req, res) => {
    try {
      const { document } = req.params
      const veterinarian = await Person.findByPk(document)
      if (veterinarian) {
        res.json(veterinarian)
      } else {
        res.status(404).json({ err: 'client not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteVeterinarian = async (req, res) => {
    try {
      const { document } = req.params
      await Person.destroy({
        where: {
          document
        }
      })
      res.json({ message: 'Veterinarian deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateVeterinarian = async (req, res) => {
    try {
      const { document } = req.params
      const veterinarian = await Person.findByPk(document)
      veterinarian.set(req.body)
      await veterinarian.save()
      res.status(202).json(veterinarian)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}