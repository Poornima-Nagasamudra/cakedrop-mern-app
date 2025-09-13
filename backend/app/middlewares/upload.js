const path = require("path")
const multer = require("multer")

const Storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , "uploads")
    },
    filename: function( req , file , cb){
        let ext = path.extname(file.originalname)
        cb(null , Date.now() + ext)
    }
})

const upload = multer({
    storage : Storage ,
    fileFilter : function  (req, file, cb){
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, jpeg, png, webp and pdf files are supported!'), false);
        }
        console.log('Mimetype:', file.mimetype);

        // if(
        //     file.mimetype == "image/png" ||
        //     file.mimetype == "image/jpeg"           
        // ) {
        //     callback(null , true)
        // } else {
        //     console.log("Only Jpeg and Png files Supporter")
        //     callback(null , false)
        // }
    }
    // limits: {
    //     fileSize: 5 * 1024 * 1024 // 5 MB limit
    //   }
})

module.exports = upload