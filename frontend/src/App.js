import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import fetchHelper from './services/servers'
import { Container } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
// import CircularProgress from '@material-ui/core/CircularProgress'

import Title from './components/Title'
import Subtitle from './components/Subtitle'
import Input from './components/Input'

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         '& > * + *': {
//             marginLeft: theme.spacing(2),
//         },
//     },
// }))

// const CircularIndeterminate = () => {
//     const classes = useStyles()

//     return (
//         <div className={classes.root}>
//             <CircularProgress />
//         </div>
//     )
// }

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const DataRow = ({ data }) => {
    return (
        <TableRow>
            <TableCell>{data.hostname}</TableCell>
            <TableCell>{data.online}</TableCell>
            <TableCell>{data.ip}</TableCell>
            <TableCell>{data.version}</TableCell>
            <TableCell>{data.playersOnline}</TableCell>
            <TableCell>{data.playersMax}</TableCell>
            <TableCell>{data.blocked}</TableCell>
            <TableCell>{data.blockTime}</TableCell>
            <TableCell>{data.offlineMode}</TableCell>
        </TableRow>
    )
}

const DataTable = ({ names, data }) => {
    console.log('DataTable names: ', names)
    console.log('DataTable data: ', data)
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='Server Info'>
                <TableHead>
                    <TableRow>
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
                    {data.map(data => (
                        <DataRow data={data} key={data.hostname} />
                    ))}
                </TableHead>
            </Table>
        </TableContainer>
    )
}

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
