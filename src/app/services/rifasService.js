import axios from "axios";

// const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
const SERVER_URL = process.env.SERVER_URL;
const headers = {
  "Content-Type": "application/json",
};

export default {
  getRifas: () => {
    const url = `${SERVER_URL}/rifa?x=`;
    return axios.get(url, headers);
  },
  getRifaInfo: (rifaId) => {
    const url = `${SERVER_URL}/rifa?rifa_id=${rifaId}`;
    return axios.get(url, headers);
  },
};
