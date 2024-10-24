import axios from "axios";
// import {useState} from "react";
// import { useFetchClient } from "@strapi/helper-plugin";
// const { get } = useFetchClient();
const pingeneratorRequests = {    
  getPingenconfig: async () => {
    const data = await axios.get(`../../pingenerator/pass-data/get`);
    // console.log("pingeneratorRequests => ", data );
    return data;
  },
  // postPingenconfig: async () => {
  //   const data = await axios.post(`./pingenerator/pass-data`);
  //   return data;
  // },
};
export default pingeneratorRequests;
