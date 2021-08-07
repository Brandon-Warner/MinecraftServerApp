import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import namesReducer from './reducers/namesReducer'
import dataReducer from './reducers/dataReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    names: namesReducer,
    data: dataReducer,
    filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
