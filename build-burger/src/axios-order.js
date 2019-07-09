import axios from 'axios';

const instance =axios.create({
    baseURL: "https://learnreact-fc2c9.firebaseio.com/"
});

export default instance;