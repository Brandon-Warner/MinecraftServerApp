import React from 'react'

const Input = ({ onChange }) => {
    return <input type='file' accept='.csv, .xlsx, .xls' onChange={onChange} />
}

export default Input
