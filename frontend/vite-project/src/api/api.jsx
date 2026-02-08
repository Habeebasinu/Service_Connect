import axios from 'axios'
import { Await } from 'react-router-dom';

// const API_URL="http://localhost:5000"

// export const GetAuthor = () => {
//   const token = localStorage.getItem('token');
//   return {
//     Authorization: token ? `Bearer ${token}` : "",
//     "Content-Type": "application/json"

   
//   };
// }

const API_URL="https://service-connect-1-ppdo.onrender.com"


export const GetAuthor = () => {
  const token = localStorage.getItem("token");

  if (!token) return {}; 

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const Signup=async(data)=>{
    try{
        return await axios.post(`${API_URL}/user/register`,data)
    }catch(error){
       console.log("Register API error:", error);
        throw error;
    }
}

export const Signin =async(inp)=>{
    try{
        return await axios.post(`${API_URL}/user/login`,inp)
        


    }
    catch(error){
       console.log("Register API error:", error);
        throw error;
    }

}
  export const Profileseen= async(id)=>{
    try{
        return await axios.get(`${API_URL}/user/profile/${id}`,{
          headers:GetAuthor()
        })
    }catch(error){
         console.log("User not found:", error);
        throw error;

    }
  }

  // export const ServiceAdd=async(id,formData)=>{
  //   try{
  //       return await axios.post(`${API_URL}/provider/add/${id}`,formData,{
  //         headers:{
  //             ...GetAuthor() 
  //         }
  //       })
  //   } catch (error) {
  //   console.log("not post:", error);
  //   throw error;
  // }

  // }
  export const ServiceAdd = async (id, formData) => {
  try {
    const token = GetAuthor().Authorization; // only token

    return await axios.post(
      `${API_URL}/provider/add/${id}`,
      formData,
      {
        headers: {
          Authorization: token // ✅ KEEP AUTH
        }
      }
    );
  } catch (error) {
    console.log("not post:", error);
    throw error;
  }
};

//provider
  export const Viewservices=async(id)=>{
    try{
       return await axios.get(`${API_URL}/provider/views/${id}`,{
          headers:GetAuthor()
        })
    }catch (error) {
    console.log("not found:", error);
    throw error;
  }
  }
  
  export const viewallservices=async()=>{
    try{
        return await axios.get(`${API_URL}/user/viewall`,{
          headers:GetAuthor()
        })
    }catch (error) {
    console.log("not found:", error);
    throw error;
  }
  }

 

export const viewServiceById = (id) => {
  try{
      return axios.get(`${API_URL}/user/viewservice/${id}`,{
          headers:GetAuthor()
        });
}catch (error) {
    console.log("not found:", error);
    throw error;
}
}

export const Bookservices = async (id,inp) => {
  try {
    return await axios.post(`${API_URL}/user/book/${id}`, inp, {
      headers: GetAuthor(),  withCredentials: true
    });
  } catch (error) {
    console.log("booking error:", error);
    throw error;
  }
}

export const Viewbook = async (id) => {
  try {
    return await axios.get(`${API_URL}/user/view/${id}`, {
      headers: GetAuthor()
    });
  } catch (error) {
    console.log("booking not found :", error);
    throw error;
  }
}

export const Deletebooking=async(id)=>{
  try{
    return await axios.delete(`${API_URL}/user/delete/${id}`,
      {
        headers:GetAuthor()
      }
    )
  }catch(error) {
    console.log("service not delete:", error);
    throw error

  }
}
export const Deleteservices=async(id)=>{
  try{
    return await axios.delete(`${API_URL}/provider/dlt/${id}`,
      {
        headers:GetAuthor()
      }
    )
  }catch(error) {
    console.log("service not delete:", error);
    throw error

  }
}


 export const  Viewbookbyid=async(id)=>{
  try{
    return await axios.get(`${API_URL}/user/getbook/${id}`,{
       headers:GetAuthor()
    })
  }catch(error) {
    console.log("booking not found:", error);
    throw error

  }

 }

export const Editbooking=async(id,inp)=>{
  
  try{
    return await axios.put(`${API_URL}/user/edit/${id}`,inp,{
      headers:GetAuthor()
    })
  }catch(error) {
    console.log("service not updated:", error);
    throw error

  }

}

export const ReviewService=async(id,data)=>{
  try{
    return await axios.post(`${API_URL}/user/review/${id}`,data,{
      headers:GetAuthor()
    })
  }catch(error){
     console.log("service review error:", error);
    throw error

  }
}


// export const GetserviceLength=async(id)=>{
//   try{
//     return await axios.get(`${API_URL}/provider/totalservice/${id}`)
//   }catch(error){
//      console.log("no service found:", error);
//     throw error
//   }
// }

export const getProviderBookings = async (id) => {
  try {
    return await axios.get(  `${API_URL}/provider/book/${id}`,
      { headers: GetAuthor() }
    );
  } catch (error) {
    console.log("Provider bookings API error:", error);
    throw error;
  }
};
 export const fetchbookings=async()=>{
  try{
    return await axios.get(`${API_URL}/admin/booking`)
  }catch (error) {
    console.log("bookings API error:", error);
    throw error;
  }
 }

 export const Getservicer=async()=>{
  try{
    return await axios.get(`${API_URL}/admin/servicer`)
  }catch (error) {
    console.log(" error:", error);
    throw error;
  }
 }

 export const approveProvider =async (id) =>{
  try{
 return await axios.patch(`${API_URL}/admin/approveprovider/${id}`);
  }catch (error) {
    console.log(" error:", error);
    throw error;
  }
 
}

export const confirmBooking = async (bookingId) => {
  try {
    return await axios.patch(  `${API_URL}/provider/confirm/${bookingId}`,
      {},                   
      { headers: GetAuthor() } 
    );
  } catch (error) {
    console.log(" error:", error);
    throw error;
  }
};

export const completeBooking = async (bookingId) => {
  try {
    return await axios.patch(`${API_URL}/provider/complete/${bookingId}`,
      {},                   
      { headers: GetAuthor() } 
    );
  } catch (error) {
    console.log(" error:", error);
    throw error;
  }
};

export const Allbooking=async()=>{
  try{
    return await axios.get(`${API_URL}/user/allbook`,{
      headers:GetAuthor()
    })
  }catch(error){
    console.log("no booking found")
     throw error;

  }
}

export const serviceEdit=async(id,formdata)=>{
  
  try{
    return await axios.put(`${API_URL}/provider/servicediting/${id}`,formdata,{
      headers:GetAuthor()
    })
  }catch(error) {
    console.log("service not updated:", error);
    throw error

  }

}
 export const  ViewServiceById=async(id)=>{
  try{
    return await axios.get(`${API_URL}/provider/getservice/${id}`,{
       headers:GetAuthor()
    })
  }catch(error) {
    console.log("servicenot found:", error);
    throw error

  }

 }