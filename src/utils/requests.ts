import axios from "axios"

// TODO fix the requests so that requests are made to the correct backend url
export const getUsers = () => {
    return axios.get("/api/users");
}

export const getUserById = (id: string) => {
    return axios.get(`/api/users/${id}`);
}