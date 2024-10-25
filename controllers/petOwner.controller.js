import { PetOwner } from '../models/petOwner.model.js'
import { Person } from '../models/person.model.js'

export class PetOwnerController {
  getAllPetOwners = async (req, res) => {
    try {
      const petOwners = await PetOwner.findAll({
        include: [{
          model: Person,
        }]
      })
      res.json(petOwners)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting pet owners' })
    }
  }

  createPetOwner = async (req, res) => {
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
        await PetOwner.create({ document: id })
        return res.status(201).json({ newPerson })
      }
      return res.status(400).json({ message: 'Account already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getPetOwner = async (req, res) => {
    try {
      const { document } = req.params
      const petOwner = await Person.findByPk(document)
      if (petOwner) {
        res.json(petOwner)
      } else {
        res.status(404).json({ err: 'client not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deletePetOwner = async (req, res) => {
    try {
      const { document } = req.params
      await Person.destroy({
        where: {
          document
        }
      })
      res.json({ message: 'Pet Owner deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updatePetOwner = async (req, res) => {
    try {
      const { document } = req.params
      const petOwner = await Person.findByPk(document)
      petOwner.set(req.body)
      await petOwner.save()
      res.status(202).json(petOwner)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}