import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getPosts: () => {
            return new Promise( done => {
                axios.get( `http://localhost:5000/api/posts` )
                    .then( res => done( res.data ) )
                    .catch( err => done( err ) )
            } )
        },
    },
    modules: {
    }
})