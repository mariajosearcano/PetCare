import { Pet } from '../models/pet.model.js'
import { PetOwner } from '../models/petOwner.model.js'

export class PetController {
  getAllPets = async (req, res) => {
    try {
      const pets = await Pet.findAll({
        include: [{
          model: PetOwner
        }]
      })
      res.status(200).json(pets)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createPet = async (req, res) => {
    try {
      const { petId, name, species, age, weight, photo, document } = req.body
      const pet = await Pet.findOne({ where: { petId, name, species, age, weight, photo, document } })
      if (!pet) {
        const newPet = await Pet.create(req.body, {
          include: [{
            model: PetOwner
          }]
        })
        return res.status(201).json(newPet)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getPet = async (req, res) => {
    try {
      const { petId } = req.params
      const pet = await Pet.findByPk(petId, {
        include: [{
          model: PetOwner
        }]
      })
      if (pet) {
        res.json(pet)
      } else {
        res.status(404).json({ err: 'Pet not found' })
      }
      res.status(200).json(pet)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deletePet = async (req, res) => {
    try {
      const { petId } = req.params
      await Pet.destroy({
        where: {
          petId
        }
      })
      res.json({ message: 'Pet deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updatePet = async (req, res) => {
    try {
      const { petId } = req.params
      const pet = await Pet.findByPk(petId)
      pet.set(req.body)
      await pet.save()
      res.status(202).json(pet)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}