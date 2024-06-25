"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;


const AxiosApi = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios.get(MASTER_URL).then(response => { setRestaurants(response.data) })
  }, []);

  return (
    <div>AxiosApi</div>
  )
};

export default AxiosApi;