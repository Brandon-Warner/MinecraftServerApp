import React from 'react'
import { searchFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

const Filter = ({ classes }) => {
    const dispatch = useDispatch()
    const handleChange = e => {
        e.preventDefault()
        const filter = e.target.value
        dispatch(searchFilter(filter))
    }
    return (
        <form className={classes.filterSearch} noValidate autoComplete='off'>
            <TextField
                className={classes.filterTextField}
                id='standard-basic'
                label='Search Names'
                onChange={handleChange}
            />
            <SearchIcon color='primary' />
        </form>
    )
}

export default Filter
