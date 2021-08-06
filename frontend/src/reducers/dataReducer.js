export const getData = data => {
    return async dispatch => {
        dispatch({
            type: 'GET_DATA',
            data: data,
        })
    }
}

const dataReducer = (state = [], action) => {
    console.log('ACTION.DATA: ', action.data)
    switch (action.type) {
        case 'GET_DATA':
            return [...state, action.data]
        default:
            return state
    }
}

export default dataReducer
