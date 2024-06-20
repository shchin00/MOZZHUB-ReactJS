import createHistory from 'history/createBrowserHistory'
import {routerMiddleware, connectRouter } from 'connected-react-router'

import { init } from '@rematch/core'
import logger from 'redux-logger'
import * as models from './models'

export const history = createHistory({ basename: '/mozzhub' })
const middleware = routerMiddleware(history)
export const store = init({
    models,
    redux: {
        reducers:{
            router: connectRouter(history)
        },
        middlewares: [middleware,logger]
        }
    })

export const { getState, dispatch } = store
