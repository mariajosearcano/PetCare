const multer = require('multer');
//const upload = multer().single('photo');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dieprtgzj',
    api_key: process.env.CLOUDINARY_API_KEY || '929629359712862', 
    api_secret: process.env.CLOUDINARY_API_SECRET || 'b6rhvyNQT22etLGtx4HCi0RVi0o',
    secure: true
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
//}).any();
//}).single('putPhoto'); // 'photo' should match the name attribute in the form
}).fields([
    { name: 'photo', maxCount: 1 },
    { name: 'putPhoto', maxCount: 1 }
])

async function uploadPhoto(req, res, next) {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Verifica si hay archivos y obtén el archivo correcto
        if (!req.files || !req.files.photo) {
            return next();
        }

        try {
            const pet_owner_document = req.cookies.document;

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        folder: `pet_care/${pet_owner_document}`,
                        public_id: `${req.body.name}`
                    }, async function (error, result) {
                        if (error) {
                            return res.status(500).json({ error: error.message });
                        }

                        if (req.body.oldName != req.body.name) {
                            //req.body.oldPhotoUrl = req.body.photo_url;
                            req.body.flag = true;
                        }

                        req.body.photo_url = result.url;
                        next();
                    }
                );

                // Usa el buffer del archivo específico
                uploadStream.end(req.files.photo[0].buffer);
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}

// Función para subir imagen
// async function uploadPhoto(req, res, next) {
//     upload(req, res, async function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//
//         const pet_owner_document = req.cookies.document;
//
//         // If no file was uploaded, continue without uploading to Cloudinary
//         if (!req.files) {
//             //req.body.photo_url = null;
//             //req.body.pet_owner_document = pet_owner_document;
//             return next();
//         }
//
//          try {
//             const result = await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.v2.uploader.upload_stream(
//                     {
//                         resource_type: 'image',
//                         public_id: `pet_care/${pet_owner_document}/${req.body.pet_id}`,
//                         folder: `pet_care/${pet_owner_document}`
//                     }, async function (error, result) {
//                         if (error) {
//                             return res.status(500).json({ error: error.message });
//                         }
//
//                         req.body.photo_url = result.url;
//                         //req.body.pet_owner_document = pet_owner_document;
//                         next();
//                     }
//                 );
//
//                 uploadStream.end(req.files.buffer);
//             });
//         } catch (error) {
//             return res.status(500).json({ error: error.message });
//         }
//     });
// }
//
// // Función para eliminar imagen
// async function deletePhoto(req, res, next) {
//     const pet_owner_document = req.cookies.document;
//     console.log(req.body)
//      // If no file was uploaded, continue without deleting to Cloudinary
//     if (!req.body.photo_url) {
//         return next();
//     }
//
//     try {
//         cloudinary.v2.api.delete_resources_by_prefix(`pet_care/${pet_owner_document}/${req.body.name}`,
//             async function (error, result) {
//             if (error) {
//                 return res.status(500).json({ error: error.message });
//             }
//
//             console.log('The photo was deleted successfully');
//             //await cloudinary.v2.api.delete_folder(`${pet_owner_document}/${req.body.name}`);
//             next();
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// async function uploadPhoto(req, res, next) {
//     upload(req, res, async function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//
//         const pet_owner_document = req.cookies.document;
//
//         // Transfer FormData fields to req.body
//         if (req.files) {
//             Object.keys(req.body).forEach(key => {
//                 req.body[key] = req.body[key];
//             });
//         }
//
//         if (!req.files || !req.files['putPhoto']) {
//             return next();
//         }
//
//         try {
//             const result = await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.v2.uploader.upload_stream(
//                     {
//                         resource_type: 'image',
//                         public_id: `pet_care/${pet_owner_document}/${req.body.putName}`,
//                         folder: `pet_care/${pet_owner_document}`
//                     }, async function (error, result) {
//                         if (error) {
//                             return res.status(500).json({ error: error.message });
//                         }
//
//                         req.body.photo_url = result.url;
//                         next();
//                     }
//                 );
//
//                 uploadStream.end(req.files['putPhoto'][0].buffer);
//             });
//         } catch (error) {
//             return res.status(500).json({ error: error.message });
//         }
//     });
// }

async function deletePhoto(req, res, next) {
    if (!req.body.flag) {
        return next();
    }

    try {
        const pet_owner_document = req.cookies.document;
        var nameImage = selectImage(req);

        cloudinary.v2.api.delete_resources_by_prefix(`pet_care/${pet_owner_document}/${nameImage}`,
            async function (error, result) {
                if (error) {
                    return res.status(500).json({error: error.message});
                }

                console.log('The photo was deleted successfully');
                next();
            }
        );
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

function selectImage(req){
    if (req.body.oldName) {
        return req.body.oldName;
    } else {
        return req.body.name;
    }
}



module.exports = {
    uploadPhoto,
    deletePhoto
};