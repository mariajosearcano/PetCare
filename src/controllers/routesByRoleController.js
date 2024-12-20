const routesByRole = {
  administrator: [
    '/admin',
    '/manageUsers',
    '/manageMedicines',
    '/manageSchedules',
    '/changePasswordAdministrator'
  ],
  petOwner: [
    '/petOwner',
    '/managePet',
    '/scheduleAppointment',
    '/medicalRecord',
    '/changePasswordPetOwner'
  ],
  veterinarian: [
      '/veterinarian',
      '/treatment',
      '/registerPetOwner',
      '/scheduleAppointmentVeterinarian',
      '/changePasswordVeterinarian'
  ]
};



module.exports = {
    routesByRole
}