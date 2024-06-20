import config from './config'
import { dispatch } from './store.js'
import { push } from 'react-router-redux'

const headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json; charset=utf-8'
}

export const user = {
    login(body, state) {
        fetch(`${config.url}/login`, { 
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            if(data.data === 401){
                let nextState = {
                    status:false
                }
                dispatch(push('/login',{status:false}))
                return nextState
            }
            else{
                if(data.level==1){
                    let nextState = this.loginDone(data)
                    dispatch(push('/'))
                    return nextState
                }
                else if (data.level==2){
                    console.log(data.level)
                    let nextState = {
                        status:true
                    }
                    dispatch(push('/login',{status:true}))
                    return nextState
                }
                else{

                }
            }
        })
    }

}

export const record = {
    /* record(){
        let url = `${config.url}/genList`
            fetch(url)
            .then (res =>res.json())
            .catch((err)=>console.log(err))
        let url2 = `${config.url}/record`
        fetch(url2)
            .then (res =>res.json())
            .then (data =>  this.recordDone(data) 
        );
    } */
}

export const nodes = {
    getNodes(state) {
        /* fetch(`${config.url}/rankingData`)
        .then(res => res.json())
        .then(data => this.getNodesDone(data)) */
    }
}