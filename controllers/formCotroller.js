const formModel = require("../models/formModel")
const aws = require("../middleware/aws");
const { default: mongoose } = require("mongoose");


/////////////////////////////////////////////////////////
//  VALIDATORS  //

const isValidFile = function (files) {
   let imageRegex = /.*\.(jpeg|jpg|png|pdf)$/;
   return imageRegex.test(files)
}

///////////////////////////////////////////////////////////////

const createForm = async function (req, res) {
   try {
      let data = req.body
      
      if (Object.keys(data).length == 0) {
         return res.status(400).send({ status: false, msg: "Please enter data in form" })
      }


      let files = req.files;
      if (files.length == 0) return res.status(400).send({ status: false, message: "Please provide file" })
      if (!isValidFile(files[0].originalname)) return res.status(400).send({ status: false, message: "Please provide file only" })
      if (!isValidFile(files[1].originalname)) return res.status(400).send({ status: false, message: "Please provide file only" })

      if (!data.firstName || typeof (data.firstName) != "string") {
         return res.status(400).send({ status: false, msg: "Please enter first name" })
      }

      if (!data.lastName || typeof (data.lastName) != "string") {
        return res.status(400).send({ status: false, msg: "Please enter last name" })
     }

      if (!data.email || typeof (data.email) != "string") {
         return res.status(400).send({ status: false, msg: "Email is required" })
      }

      if (!data.dob) {
         return res.status(400).send({ status: false, msg: "DOB is required" })
      }

      if(data.dob){
        let last = new Date(data.dob).getTime()
        let today = new Date().getTime()
        if((today - last)< 568025136){
            return res.status(400).send({ status: false, msg: "Minimun age should be 18 years" })
        }
      }

      if (!data.residentialAddressStreet1) {
         return res.status(400).send({ status: false, msg: "Fill residential address Street 1" })
      }

      if (!data.residentialAddressStreet2) {
        return res.status(400).send({ status: false, msg: "Fill residential address Street 2" })
     }

    if(data.sameAsResidential == true){
        (data.permanentAddressStreet1 = data.residentialAddressStreet1) && ((data.permanentAddressStreet2 = data.residentialAddressStreet2))
    }
    else{
        if(!data.permanentAddressStreet1){
            return res.status(400).send({ status: false, msg: "Fill permanent address Street 1" })
        }
        if(!data.permanentAddressStreet2){
            return res.status(400).send({ status: false, msg: "Fill permanent address Street 2" })
        }
    }

    if(!data.fileName1){
        return res.status(400).send({ status: false, msg: "Fill file name" })
    }

    if(!data.type1){
        return res.status(400).send({ status: false, msg: "Fill file type" })
    }

    if((data.type1 !== "image") || (data.type1 !== "pdf")){
        return res.status(400).send({ status: false, msg: "File type should be image or pdf" })
    }

    if(!data.fileName2){
        return res.status(400).send({ status: false, msg: "Fill file name" })
    }

    if(!data.type2){
        return res.status(400).send({ status: false, msg: "Fill file type" })
    }

    if((data.type2 !== "image") || (data.type2 !== "pdf")){
        return res.status(400).send({ status: false, msg: "File type should be image or pdf" })
    }
    if(!files[0]){
        return res.status(400).send({ status: false, msg: "Upload a image or pdf" })
    }

    if(!files[1]){
        return res.status(400).send({ status: false, msg: "Upload a image or pdf" })
    }


      ////////////////  uploading images on aws /////////////////////

        if (files[0]){
      const uploadedFileURL = await aws.uploadFile(files[0]);
      data.link1 = uploadedFileURL;
        }

        if (files[1]){
      const uploadedFileURL1 = await aws.uploadFile(files[1])
      data.link2= uploadedFileURL1;
        }

      let createdData = await formModel.create(data)
      return res.status(200).send({ status: true, msg: "Form created succesfully", formData: createdData })
   }

   catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
   }
}


module.exports.createForm = createForm