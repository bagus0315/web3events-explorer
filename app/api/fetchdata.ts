import axios from "axios";

export const fetchWeb3event = async (pages: number = 0,status:number = 1, query_type: number = 0) => {

  const data = {
    "pages": pages,
    "page_size": 20,
    "keywords": "",
    "topic": null,
    "pay": null,
    "status": status,
    "query_type": query_type
  };

  try {
    const result: any = await axios.post(`https://www.web3event.org/web3event/api/v1/events/query`,
      data,
    )
    return result.data.data;
  } catch (error) {
    console.error('Error fetching web3event data list:', error);
    throw error;
  };
};

export const fetchWeb3eventMap = async () => {
  const data = {
    "pages": 0,
    "page_size": 0,
    "status": 1,
    "time": "",
    "time_to": "",
    "type": 1
  };

  try {
    const result: any = await axios.post(`https://www.web3event.org/web3event/api/v2/map/events/query`,
      data)
    return result.data.data;
  } catch (error) {
    console.error('Error fetching web3event map data:', error);
    throw error;
  };
};


export const getWeb3eventDetail = async (id: number) => {
  try {
    const response: any = await axios.get(`https://www.web3event.org/web3event/api/v3/event/detail/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching web3event detail:', error);
    throw error;
  };
};
