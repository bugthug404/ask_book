import axios from "axios";

export async function calling(path: string) {
  try {
    const response = await axios.get(`http://localhost:3009/${path}`);
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
