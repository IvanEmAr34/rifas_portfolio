import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;
// https://fm7bma7zdl.execute-api.us-west-2.amazonaws.com/dev/rifa/tickets?rifa_id=101&number=123
export default {
  getTicketInfo: (rifaId, ticketNumber) => {
    const url = `${SERVER_URL}/rifa/tickets?rifa_id=${rifaId}&number=${ticketNumber}`;
    return axios.get(url);
  },
  setTicketInfo: (payload) => {
    const url = `${SERVER_URL}/rifa/tickets`;
    return axios.post(url, payload);
  },
};
