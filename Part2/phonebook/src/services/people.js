import axios from "axios";
const baseUrl = "http://localhost:3001/people";

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
};

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log('contact deleted', response))
};

const peopleService = { getAll, create, update, deleteContact}
    
export default peopleService;