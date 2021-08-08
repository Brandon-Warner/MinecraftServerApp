export const getNames = names => {
    return {
        type: 'GET_NAMES',
        data: names,
    }
}

const namesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_NAMES':
            return action.data
        default:
            return state
    }
}

export default namesReducer
