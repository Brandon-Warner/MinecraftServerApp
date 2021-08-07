export const createFilter = filter => {
    return {
        type: 'ACTIVATE_FILTER',
        data: filter,
    }
}

// export const noFilter = () => {
//     return {
//         type: 'NO_FILTER',
//     }
// }

const filterReducer = (state = 'NO_FILTER', action) => {
    console.log('ACTION DATA: ', action.data)
    switch (action.type) {
        case 'ACTIVATE_FILTER':
            return action.data
        case 'NO_FILTER':
            return ''
        default:
            return state
    }
}

export default filterReducer
