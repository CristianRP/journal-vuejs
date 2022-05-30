import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vue-demos-c3180-default-rtdb.firebaseio.com'
})

export default journalApi
