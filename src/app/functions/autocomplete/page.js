import axios from 'axios';

export async function getStatusTypes() {
  try {
    const res = await axios.get("/api/v1/bookings/statusType");
    return res.data.response;
  } catch (error) {
    console.error("Erro ao obter os tipos de status:", error);
    return [];
  }
}