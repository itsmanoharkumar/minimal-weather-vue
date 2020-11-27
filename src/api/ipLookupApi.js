import * as axios from "axios";

export default async function fetchLocation() {
  const response = await axios.get(`http://ip-api.com/json`);
  return response.data;
}
