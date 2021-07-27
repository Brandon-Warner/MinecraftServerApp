import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'
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
        headerName: 'Hostname',
        field: 'hostname',
        editable: true,
        width: 125,
    },
    {
        headerName: 'Online',
        field: 'online',
        editable: true,
        width: 100,
    },

    {
        headerName: 'Ip',
        field: 'ip',
        editable: true,
        width: 125,
    },
    {
        headerName: 'Version',
        field: 'version',
        editable: true,
        width: 125,
    },

    {
        headerName: 'PlayersOnline',
        field: 'playersOnline',
        editable: true,
        width: 150,
    },
    {
        headerName: 'PlayersMax',
        field: 'playersMax',
        editable: true,
        width: 150,
    },
    {
        headerName: 'Blocked',
        field: 'blocked',
        editable: true,
        width: 125,
    },
    {
        headerName: 'BlockTime',
        field: 'blockTime',
        editable: true,
        width: 125,
    },
    {
        headerName: 'Offline Mode',
        field: 'offlineMode',
        editable: true,
        width: 150,
    },
]

const rows = [
    {
        id: 1,
        hostname: 'Jartex',
        online: 'yes',
        offlineMode: 'no',
        ip: '1111111',
        version: '1.1',
        playersOnline: 11,
        playersMax: 111,
        blocked: 'no',
        blockTime: 'N/A',
    },
]

const DataTable = ({ data }) => {
    return (
        <div>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight={true}
                autoPageSize={true}
                disableColumnMenu={true}
                columnBuffer={columns.length}
            />
        </div>
    )
}

const App = () => {
    const [data, setData] = useState([])
    const [pending, setPending] = useState(false)

    // const processData = data => {
    //     const list = data.split(/\r\n|\n/)
    //     console.log(list)
    // }

    const handleFileUpload = e => {
        e.preventDefault()
        // const file = e.target.files[0]
        // const reader = new FileReader()
        // reader.onload = e => {
        //     // PARSE DATA
        //     const bstr = e.target.result
        //     const workbook = XLSX.read(bstr, { type: 'binary' })
        //     // GET FIRST WORKSHEET
        //     const wsname = workbook.SheetNames[0]
        //     const ws = workbook.Sheets[wsname]
        //     // CONVERT ARRAY OF ARRAYS
        //     const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
        //     console.log('data from file upload: ', data)
        //     processData(data)
        // }
        // reader.readAsBinaryString(file)
    }
    console.log('data: ', data)
    return (
        <Container>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <DataTable columns={columns} rows={rows} />
            </div>
        </Container>
    )
}

export default App
