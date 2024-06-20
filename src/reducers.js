import parse from 'wellknown'

export const user = {
    loginDone: (state, data) => {
        //console.log(data)
        var coor = data.coor
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', data.user)
        sessionStorage.setItem('name', data.name)
        sessionStorage.setItem('area', data.area)
        sessionStorage.setItem('level', data.level)
        sessionStorage.setItem('lat',coor.split(',')[0])
        sessionStorage.setItem('lng',coor.split(',')[1])
        /* document.cookie = `token=${data.token}`
        document.cookie = `user=${data.user}`
        document.cookie = `name=${data.name}`
        document.cookie = `area=${data.area}` */
        return {
            ...state,
            auth_token: data.token,
            user:data.user,
            name:data.name,
            area:data.area,
            login:true
        }
    }
}

export const record = {
    recordDone: (state, data) => {
        return {
            ...state,
            record:data
        }
    }
}

export const nodes = {
    getNodesDone: (state, data) => {
        //console.log(data)
            return {
                ...state,
                nodes:data
            }
        
    }
}
