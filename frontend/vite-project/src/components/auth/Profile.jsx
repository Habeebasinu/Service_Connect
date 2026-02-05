import React from 'react'
import { Profileseen } from '../../api/api.jsx';
import { useState,useEffect } from 'react';

function Profile() {
     const [profile, setProfile] = useState({});
   const id=localStorage.getItem('id')
    
    
      useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("Fetching profile...");
      const res = await Profileseen(id);
      console.log("Profile data:", res.data);
      setProfile(res.data);
    } catch (error) {
      console.log("Profile fetch error:", error.response?.data || error.message);
    }
  };
  fetchData();
}, []);

      
    
      if (!profile) {
        return <p className="text-center">Loading...</p>;
      }
  return (
    <div className="max-w-3xl mx-auto mt-6 shadow-md rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold text-purple-800 mb-4">
        User Profile
      </h2>

      <div className="space-y-2 text-black">
        <p>
          <span className="font-semibold">Name:</span> {profile.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
         <p>
          <span className="font-semibold">user:</span> {profile.usertype}
        </p>
      </div>
    </div>
  )
}

export default Profile
