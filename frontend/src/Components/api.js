import axios from 'axios'
export const add = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/add', data)
        console.log(response)
        return response.data

    } catch (error) {
        console.log(error)
    }
}
export const read = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/read')
        console.log(response)
        return response.data

    } catch (error) {
        console.log(error)
    }
}
export const remove = async (email) => {
    try {
        console.log(email)
        const response = await axios.delete(`http://localhost:3000/api/remove/${email}`)
        console.log(response)
        return response

    } catch (error) {
        console.log(error)
    }
}

export const update = async (data) => {
    try {

        const response = await axios.put('http://localhost:3000/api/update', data)
        console.log(response)
        return response

    } catch (error) {
        console.log(error)
    }
}