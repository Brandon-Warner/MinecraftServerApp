import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

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

const createData = (
    hostname,
    online,
    ip,
    version,
    playersOnline,
    playersMax,
    blocked,
    blockTime,
    offlineMode
) => {
    return {
        hostname,
        online,
        ip,
        version,
        playersOnline,
        playersMax,
        blocked,
        blockTime,
        offlineMode,
    }
}
const isOnline = data => (data.online === true ? 'yes' : 'no')

const fetchData = async name => {
    console.log('fetchData name: ', name)
    const server_data = await axios.get(
        `http://localhost:8080/api/serverinfo/${name.name}`
    )

    const block_data = await axios.get(
        `http://localhost:8080/api/blockinfo/${name.name}`
    )

    const offline_data = await axios.get(
        `http://localhost:8080/api/offlineinfo/${name.name}`
    )

    const serverInfo = server_data.data
    const blockInfo = block_data.data
    const offlineInfo = offline_data.data
    console.log('fetch data: ', serverInfo, blockInfo, offlineInfo)
}

const DataFetchRow = name => {
    console.log('DataFetchRow props.name: ', name)
    fetchData(name)

    return <TableCell>hello</TableCell>
}

const DataTable = ({ names }) => {
    console.log('DataTable names props: ', names)
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
                        <TableRow key={name}>
                            <TableCell component='th'>{name}</TableCell>
                            <DataFetchRow name={name}></DataFetchRow>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const App = () => {
    const [names, setNames] = useState([])
    const [data, setData] = useState([])

    // const [pending, setPending] = useState(false)

    // const loadServerNames = data => {
    //     for (let i = 0; i < data.lenght; i++) {
    //         const name = data[i].toString()
    //         console.log('name: ', name)
    //     }
    // }

    const processData = data => {
        const list = data.split(/\r\n|\n/)
        console.log('list: ', list)
        const filteredList = list.filter(e => e !== '')
        console.log('filteredList: ', filteredList)

        setNames(filteredList)
    }

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
            processData(data)
        }
        reader.readAsBinaryString(file)
    }
    console.log('data after render: ', data)

    return (
        <Container>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <DataTable names={names} />
            </div>
        </Container>
    )
}

export default App
