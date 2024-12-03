// config/cloudinary.js
const multer = require('multer');
const upload = multer().single('image');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? 'dieprtgzj',
    api_key: process.env.CLOUDINARY_API_KEY ?? '929629359712862', 
    api_secret: process.env.CLOUDINARY_API_SECRET ?? 'b6rhvyNQT22etLGtx4HCi0RVi0o',
    secure: true
});



// Función para subir imagen
async function uploadImage(req, res, next) {
    upload(req, res, async function (err) {
        const pet_owner_document = req.cookies.document;

        cloudinary.uploader.upload_stream({
            resource_type: 'image',
            public_id: `${pet_owner_document}/${req.body.name}`,
        }, async function (error, result) {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            req.body.image = result.url;
            req.body.document = pet_owner_document;
            next();
        }).end(req.file.buffer);
    });
}



// Función para eliminar imagen
async function deleteImage(res, res, next) {
    const pet_owner_document = req.cookies.document;

    cloudinary.api.delete_resources_by_prefix(`${pet_owner_document}/${req.body.name}`,
        async function (error, result) {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (result.deleted && !req.params.id) {
                return res.status(200).json({ message: 'Image deleted' });
            }

            await cloudinary.api.delete_folder(`${pet_owner_document}/${req.body.name}`);
            next();
        });
}

module.exports = {
    uploadImage,
    deleteImage
};