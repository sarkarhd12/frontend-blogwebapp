export const isLoggedIn=()=>{
   let data = localStorage.getItem("data")
   if(data!=null){
    return true;
   }
   else{
    return false;
   }
}

// export const doLogin=(data,next)=>{
//     localStorage.setItem("data",JSON.stringify(data))
//     next()
// }

export const doLogin = (data, next) => {
    // Ensure 'data' contains the user object correctly
    const storedData = {
      user: data.user,  // The user object should be present here
      token: data.token, // If you're storing a token, include it too
    };
  
    // Stringify the stored data and save it to localStorage
    localStorage.setItem("data", JSON.stringify(storedData));
    next();  // Proceed to the next step after saving
  };
  

export const doLogOut=(next)=>{
    localStorage.removeItem("data")
    next()
}

// export const getCurrentUSerDetails=()=>{
//     if(isLoggedIn()){
//         return JSON.parse(localStorage.getItem("data").user)
//     }
//     else{
//         return undefined;
//     }
// }

export const getCurrentUSerDetails = () => {
    const data = localStorage.getItem("data");
    
    // Check if data exists and is a valid JSON
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Try parsing the data
  
        // Check if user is available in parsed data
        return parsedData?.user || undefined;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return undefined; // Return undefined if JSON parsing fails
      }
    }
    
    return undefined; // Return undefined if no data exists
  };

  export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}
  
  
