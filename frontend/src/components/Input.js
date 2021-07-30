import React from 'react'
import { Button } from '@material-ui/core'

const Input = ({ onChange }) => {
    return (
        <Button variant='contained' color='primary' component='label'>
            <input
                type='file'
                accept='.csv, .xlsx, .xls'
                style={{ display: 'none' }}
                onChange={onChange}
                multiple
            />
            Upload File
        </Button>
    )
}

export default Input
