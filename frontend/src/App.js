import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import fetchHelper from './services/servers'
import { Container } from '@material-ui/core'

import DataTable from './components/DataTable'
import Title from './components/Title'
import Subtitle from './components/Subtitle'
import Input from './components/Input'

const App = () => {
    const [names, setNames] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        names.map(name =>
            fetchHelper
                .fetchData(name)
                .then(response => setData(data => [...data, response]))
                .catch(e => console.log('error: ', e.message))
        )

        console.log('firing useEffect')
    }, [names])

    const handleFileUpload = e => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
            // PARSE DATA
            const bstr = e.target.result
            const workbook = XLSX.read(bstr, { type: 'binary' })
            // GET FIRST WORKSHEET
            const wsname = workbook.SheetNames[0]
            const ws = workbook.Sheets[wsname]
            // CONVERT ARRAY OF ARRAYS
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
            console.log('data from file upload: ', data)
            // processData(data)
            const list = data.split(/\r\n|\n/)
            const filteredList = list.filter(e => e !== '' && e !== undefined)
            setNames(filteredList)
        }
        reader.readAsBinaryString(file)
    }
    console.log('App component names: ', names)
    console.log('App component data: ', data)
    return (
        <Container>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <DataTable names={names} data={data} setData={setData} />
            </div>
        </Container>
    )
}

export default App
