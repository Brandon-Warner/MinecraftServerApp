import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import namesReducer from './reducers/namesReducer'
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
    names: namesReducer,
    data: dataReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
