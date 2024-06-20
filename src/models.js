import * as reducers  from './reducers'
import * as effects from './effects'

export const user = {
    state: {},
    reducers: reducers.user,
    effects: effects.user
}

export const record = {
    state:{
        record:[]
    },
    reducers: reducers.record,
    effects:effects.record
}

export const nodes = {
    state: [],
    reducers: reducers.nodes,
    effects: effects.nodes
}