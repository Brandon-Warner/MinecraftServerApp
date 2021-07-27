import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Title from './components/Title'
import Subtitle from './components/Subtitle'
import Input from './components/Input'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}))

const CircularIndeterminate = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}

const columns = [
    {
        name: 'Hostname',
        selector: 'hostname',
        sortable: true,
    },
    {
        name: 'Online',
        selector: 'online',
        sortable: true,
    },
    {
        name: 'Ip',
        selector: 'ip',
        sortable: true,
    },
    {
        name: 'Version',
        selector: 'version',
        sortable: true,
    },

    {
        name: 'PlayersOnline',
        selector: 'playersOnline',
        sortable: true,
    },
    {
        name: 'PlayersMax',
        selector: 'playersMax',
        sortable: true,
    },
    {
        name: 'Blocked',
        selector: 'blocked',
        sortable: true,
    },
    {
        name: 'BlockTime',
        selector: 'blockTime',
        sortable: true,
    },
]

const App = () => {
    const [data, setData] = useState([])
    const [pending, setPending] = useState(false)

    const processData = async dataString => {
        const list = dataString.split(/\r\n|\n/)
        setPending(true)
        let newList = []
        let newData = {}

        // fetch data from API

        for (let i = 0; i < list.length; i++) {
            if (list[i] !== '') {
                console.log('url searched: ', `${list[i]}`)
                try {
                    const api_data = await axios.get(
                        `http://localhost:8080/api/serverinfo/${list[i]}`
                    )
                    const block_data = await axios.get(
                        `http://localhost:8080/api/blockinfo/${list[i]}`
                    )

                    const api_info = api_data.data
                    const block_info = block_data.data
                    // build newData obj

                    // CREATE WORK AROUND FOR BOOLEAN IN JSON DATA
                    if (api_info.online === false) {
                        newData = {
                            hostname: api_info.hostname,
                            ip: api_info.ip,
                            version: 'N/A',
                            online: 'no',
                            playersOnline: 'N/A',
                            playersMax: 'N/A',
                            blocked:
                                block_info.blocked === false ? 'no' : 'yes',
                            blockTime:
                                block_info.lastBlocked !== null
                                    ? block_info.lastBlocked
                                    : 'N/A',
                        }
                    } else {
                        newData = {
                            hostname: api_info.hostname,
                            ip: api_info.ip,
                            version: api_info.version,
                            online: 'yes',
                            playersOnline: api_info.players.online,
                            playersMax: api_info.players.max,
                            blocked:
                                block_info.blocked === false ? 'no' : 'yes',
                            blockTime:
                                block_info.lastBlocked !== null
                                    ? block_info.lastBlocked
                                    : 'N/A',
                        }
                    }
                    // PUSH DATA TO NEW LIST
                    newList.push(newData)
                } catch (error) {
                    console.log('error :', error.message)
                }
            } else {
                // LAST DATA POINT IN LIST ARRAY IS QUOTATIONS -- THIS EVENT WILL TRIGGER STATE UPDATE
                setData(newList)
                setPending(false)
            }
        }
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
            processData(data)
        }
        reader.readAsBinaryString(file)
    }
    console.log('data: ', data)
    return (
        <Container>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <DataTable
                    title='Server Information'
                    highlightOnHover
                    columns={columns}
                    data={data}
                    fixedHeader
                    progressPending={pending}
                    progressComponent={<CircularIndeterminate />}
                />
            </div>
        </Container>
    )
}

export default App
