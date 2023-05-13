import axios from "axios";

const HOST = "http://localhost:3000/registry";

export async function registrationRequest(body) {
  try {
    const res = await axios.post(HOST, body);

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
