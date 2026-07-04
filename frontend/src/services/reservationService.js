import API from "./api";

export const createReservation = (data) => {
    return API.post("/reservations", data);
};

export const getMyReservations = () => {
    return API.get("/reservations/my");
};

export const cancelReservation = (id) => {
    return API.put(`/reservations/${id}/cancel`);
};

export const getAllReservations = () => {
    return API.get("/reservations");
};