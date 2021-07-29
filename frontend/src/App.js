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

const DataRow = ({ name, data, setData }) => {
    console.log('DataRow name prop: ', name)
    useEffect(() => {
        fetchHelper.fetchData(name).then(response => setData(...data, response))
        console.log('firing useEffect')
    }, [])
    console.log('data: ', data)
    return (
        <TableRow key={data.hostname}>
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

const DataTable = ({ names, data, setData }) => {
    console.log('DataTable names props: ', names)
    console.log('DataTable data props: ', data)

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
                </TableHead>
                <TableBody>
                    {names.map(name => (
                        <DataRow name={name} data={data} setData={setData} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const App = () => {
    const [names, setNames] = useState([])
    const [data, setData] = useState([])

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
