export const emailValidation=(eMail)=>{
    const pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
   if(pattern.test(eMail)){
    return true;
   }
   else{
    return false;
   }
}

export const numberValidation=(phoneNumber)=>{
   const pattern = /^\d{10}$/;
  if(pattern.test(phoneNumber)){
   return true;
  }
  else{
   return false;
  }
}

export const serialNumberValidation=(serialNumber)=>{
   const pattern = /^[A-Za-z0-9]*$/i;
  if(pattern.test(serialNumber)){
   return true;
  }
  else{
   return false;
  }
}


export const nameValidation=(name)=>{
   const pattern =/^[A-Za-z\s]+$/i;
  if(pattern.test(name)){
   return true;
  }
  else{
   return false;
  }
}