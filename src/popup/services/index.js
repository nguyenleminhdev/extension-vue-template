import Constants from "../../services";
import store from '../store/index'

export default {
    api: (path, body) => {
        store.dispatch('is_loading', true)

        return fetch(`${Constants.SERVER_HOST}${path}`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('access_token') || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(r => r.ok ? r.json() : r.text())
            .then(r => {
                store.dispatch('is_loading', false)
                return typeof r === 'string' ? JSON.parse(r) : r
            })
            .catch(e => {
                store.dispatch('is_loading', false)
                return e
            })
    }
}

