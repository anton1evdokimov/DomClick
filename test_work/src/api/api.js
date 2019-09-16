import * as userAxios from "axios";

const axios = userAxios.create({
    withCredentials: false,
    baseURL: 'https://opentdb.com/'    
});

export const API = {
    getQuestions() {
        return axios.get(`api.php?amount=10&category=22`).then(response => response.data);
    }    
}