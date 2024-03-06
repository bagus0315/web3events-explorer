import axios from "axios";
import { Web3event } from "../components/web3eventType";
import { headers } from "next/headers";
export const fetchWeb3event: any = async () => {
  // return new Promise((resolve, reject) => {
  const data = {
    "pages": 0,
    "page_size": 20,
    "keywords": "",
    "topic": null,
    "pay": null,
    "status": 1,
    "query_type": 0
  }
  const result: any = await axios.post(`https://www.web3event.org/web3event/api/v1/events/query`,
    data,
  )
  return result.data.data

  // })
};
export const fetchWeb3eventMap: any = async () => {
  const data = {
    "pages": 0,
    "page_size": 0,
    "status": 1,
    "time": "",
    "time_to": "",
    "type": 1
  }
  const result: any = await axios.post(`https://www.web3event.org/web3event/api/v2/map/events/query`,
    data,
  )
  return result.data.data
};