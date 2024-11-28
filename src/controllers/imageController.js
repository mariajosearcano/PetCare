// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? 'dieprtgzj',
    api_key: process.env.CLOUDINARY_API_KEY ?? '929629359712862', 
    api_secret: process.env.CLOUDINARY_API_SECRET ?? 'b6rhvyNQT22etLGtx4HCi0RVi0o'
});

// Función para subir imagen
async function uploadImage(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'pets' // Las imágenes se guardarán en una carpeta llamada 'pets'
        });
        
        return result.secure_url; // URL segura de la imagen
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}

// Función para eliminar imagen
async function deleteImage(publicId) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
}

module.exports = {
    uploadImage,
    deleteImage
};