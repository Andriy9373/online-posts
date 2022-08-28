import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        alerts: [],
    },
    getters: {
    },
    mutations: {
        addAlert: ( state, payload ) => {
            state.alerts.push(payload);
        },
        removeAlert: ( state, payload ) => {
            state.alerts.splice(payload, 1);
        },
    },
    actions: {
        getContacts: () => {
            return new Promise( done => {
                axios.get( `/api/contacts` )
                    .then( res => done( res.data ) )
                    .catch( err => done( err ) )
            } )
        },
        getPosts: () => {
            return new Promise( done => {
                axios.get( `/api/posts` )
                    .then( res => done( res.data ) )
                    .catch( err => done( err ) )
            } )
        },
        getSinglePost: (commit, data) => {
            return new Promise( done => {
                axios.get( `/api/posts/${data.id}` )
                    .then( res => done( res.data ) )
                    .catch( err => done( err ) )
            } )
        },
        createPost: (commit, data) => {
            axios.post(`/api/posts/create`, data)
        },
        deletePost: (commit, id) => {
            axios.delete(`/api/posts/${id}`)
        },
        ADD_ALERT: ({commit, state}, data) => {
            data.id = Date.now();
            commit('addAlert', data);
            if (state.alerts.length) {
                setTimeout(() => {
                    let removeMe;
                    for (let i = 0; i < state.alerts.length; i++) {
                        if (data.id === state.alerts[i].id) {
                            removeMe = i;
                        }
                    }
                    commit('removeAlert', removeMe);
                }, 1000 * 7)
            }
        },
        REMOVE_ALERT: ({commit, state}, data) => {
            let removeMe;
            for (let i = 0; i < state.alerts.length; i++) {
                if (data.id === state.alerts[i].id) {
                    removeMe = i;
                }
            }
            commit('removeAlert', removeMe);
        },
    },
    modules: {
    }
})