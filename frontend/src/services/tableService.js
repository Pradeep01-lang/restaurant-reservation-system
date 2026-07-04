import api from "./api";

export const getTables = async () => {
    const response = await api.get("/tables");
    return response.data;
};