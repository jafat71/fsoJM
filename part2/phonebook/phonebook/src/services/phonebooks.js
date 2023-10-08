import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) =>(response.data))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const confirm = window.confirm(newObject.name + " is already ddade to phonebook, replace the old number with the new one?")
    if (!confirm){
        console.log("Operation cancelled");
        throw new Error("Error Updating Person with id: " + id + ". Operation cancelled"); // lanzar una excepción
    }
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const confirm = window.confirm("Delete Confirmation: ID " + id + ". Do you want to proceed?")
    if (!confirm){
        console.log("Operation cancelled");
        throw new Error("Error Deleting Person with id: " + id + ". Operation cancelled"); // lanzar una excepción
    }
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(() => true);
}

export default { 
    getAll, 
    create, 
    update,
    deletePerson
  }