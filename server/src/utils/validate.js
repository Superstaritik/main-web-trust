const validator = require('validator');

const validate = (date)=>{
    const mandatoryField = ['email'];
    const isAllowed = mandatoryField.every((field)=>Object.keys(date).includes(field)); 
    if(!isAllowed){
        throw new Error("Some Error occured");
    }
    if(!validator.isEmail(date.email))
        throw new Error("Invalid Email");
}

module.exports=validate;