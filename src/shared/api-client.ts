import Client from 'question-bank-api-client'


const config = {
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_API_HOST}`
}

const client = new Client(config)
export default client