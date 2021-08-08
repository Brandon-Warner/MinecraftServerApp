export const searchFilter = filter => {
    return {
        type: 'TEXT_FILTER',
        data: filter,
    }
}

export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        data: filter,
    }
}

const filterReducer = (state = 'NO_FILTER', action) => {
    switch (action.type) {
        case 'TEXT_FILTER':
            return action.data
        case 'SET_FILTER':
            return action.data
        case 'NO_FILTER':
            return action.data
        default:
            return state
    }
}

export default filterReducer
