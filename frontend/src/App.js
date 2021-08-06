import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import fetchHelper from './services/servers'
import { Container, makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Title from './components/Title'
import Subtitle from './components/Subtitle'
import Input from './components/Input'
import DataRow from './components/DataRow'
import Loading from './components/Loading'

const useStyles = makeStyles(() => ({
    container: {
        fontFamily: 'Roboto',
        border: '0',
    },
    headers: {
        fontStyle: 'bold',
    },
}))

const App = () => {
    const [names, setNames] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        names.map(name =>
            fetchHelper
                .fetchData(name)
                .then(response => setData(data => [...data, response]))
                .catch(e => console.log('error: ', e.message))
        )
        // stopLoading(data, names)
        console.log('firing useEffect')
    }, [names])

    const handleFileUpload = e => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
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

    // const stopLoading = (data, names) => {
    //     if (data.length > 0 && names.length > 0 && data.length === names.length) {
    //         setLoading(false)
    //     }
    // }

    console.log('App component names: ', names)
    console.log('App component data: ', data)
    console.log('loading status: ', loading)
    return (
        <Container className={classes.container}>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='Server Info'>
                        <TableHead className={classes.headers}>
                            <TableRow key='headers'>
                                <TableCell>Name</TableCell>
                                <TableCell>Hostname</TableCell>
                                <TableCell>Online</TableCell>
                                <TableCell>Ip</TableCell>
                                <TableCell>Version</TableCell>
                                <TableCell>Players Online</TableCell>
                                <TableCell>Players Max</TableCell>
                                <TableCell>Blocked</TableCell>
                                <TableCell>Blocked Time</TableCell>
                                <TableCell>Offline Mode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {names.map(name => (
                                <Loading key={name} loading={loading} />
                            ))}

                            {data
                                .sort((a, b) => (a.name > b.name ? b - 1 : b + 1))
                                .map(data => (
                                    <DataRow key={data.name} data={data} loading={loading} />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}

export default App
