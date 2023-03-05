import { useSelector } from "react-redux";

let UserDetails = sessionStorage.getItem("LoginDetails");
const SessionTimer = JSON.parse(UserDetails)?.time;
  export const loginToken = JSON.parse(UserDetails)?.tokenNew;



var time;

export const SessionExpiration=()=>{  
    let UserDetails = sessionStorage.getItem("LoginDetails");
const SessionTimer = JSON.parse(UserDetails)?.time;

    
    console.log("Session Time is called",SessionTimer)

       clearTimeout(time)   
       
       time = setTimeout(() => {
        console.log("Ideal Timer", sessionStorage.getItem("LoginDetails"),"session Storage");
        if (sessionStorage.getItem("LoginDetails") != null) {
        //   navigate("*");
        alert("Session has timed out")
        sessionStorage.clear();
        window.location.assign('/');
        }
      }, 180000);

      
 }