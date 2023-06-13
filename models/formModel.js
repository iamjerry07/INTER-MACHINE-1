const mongoose= require('mongoose')
const formSchema = new mongoose.Schema({
firstName:{
    type:String,
    required: true
},
lastName:{
    type:String,
    required: true
},
email:{
    type:String,
    required: true
},
dob:{
    required: true
},
// residential address
residentialAddressStreet1:{
    type:String,
    required: true
},
residentialAddressStreet2:{
    type:String,
    required: true
},

sameAsResidential:{
    type:Boolean,
    required: true
},

// permanent address
permanentAddressStreet1:{
    type:String,
    required: true
},
permanentAddressStreet2:{
    type:String,
    required: true
},
// Documents
fileName1:{
    type:String,
    required: true
},type1:{
    type:String,
    required: true
},link1:{
    type:String,
    required: true
},

fileName2:{
    type:String,
    required: true
},type2:{
    type:String,
    required: true
},link2:{
    type:String,
    required: true
},
}
,{timestamps:true})

module.exports = mongoose.model("form schema", formSchema);