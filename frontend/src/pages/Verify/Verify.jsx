import React from 'react'
import './Verify.css'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';
const Verify = () => {
    const [searchPrams,setSearchParams]=useSearchParams();
    const success=searchPrams.get("success");
     const orderId=searchPrams.get("orderId");
    //  console.log(success,orderId)
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (

    <div className='verify'>
          <div className="spinner">
            kj
          </div>
    </div>
  )
}

export default Verify