import React from 'react'
import { createFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    filter: {
        width: '33%',
    },
    search: {
        width: '50%',
    },
}))

const Filter = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleChange = e => {
        e.preventDefault()
        const filter = e.target.value
        dispatch(createFilter(filter))
    }
    return (
        <form className={classes.filter} noValidate autoComplete='off'>
            <TextField className={classes.search}id='standard-basic' label='Search Names' onChange={handleChange} />
            <SearchIcon color='primary' />
        </form>
    )
}

export default Filter
