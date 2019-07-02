import axios from 'axios';

const instance =axios.create({
    baseURL: "https://learnreact-71fa9.firebaseio.com/"
});

export default instance;