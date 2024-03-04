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