import { Administrator } from '../models/administrator.model.js'
import { Person } from '../models/person.model.js'

export class AdministratorController {
  getAllAdministrators = async (req, res) => {
    try {
      const administrators = await Administrator.findAll({
        include: [{
          model: Person,
        }]
      })
      res.json(administrators)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting administrators' })
    }
  }

  createAdministrator = async (req, res) => {
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
        await Administrator.create({ document: id })
        return res.status(201).json({ newPerson })
      }
      return res.status(400).json({ message: 'Account already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getAdministrator = async (req, res) => {
    try {
      const { document } = req.params
      const administrator = await Person.findByPk(document)
      if (administrator) {
        res.json(administrator)
      } else {
        res.status(404).json({ err: 'client not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteAdministrator = async (req, res) => {
    try {
      const { document } = req.params
      await Person.destroy({
        where: {
          document
        }
      })
      res.json({ message: 'Administrator deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateAdministrator = async (req, res) => {
    try {
      const { document } = req.params
      const administrator = await Person.findByPk(document)
      administrator.set(req.body)
      await administrator.save()
      res.status(202).json(administrator)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
