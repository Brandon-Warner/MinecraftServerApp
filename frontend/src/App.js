import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import fetchHelper from './services/servers'
import { getNames } from './reducers/namesReducer'
import { getData } from './reducers/dataReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
    Container,
    makeStyles,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Paper,
} from '@material-ui/core'

import Title from './components/Title'
import Subtitle from './components/Subtitle'
import Input from './components/Input'
import Filter from './components/FilterSearch'
import FilterCheckBox from './components/FilterCheckBox'
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
    filterRow: {
        display: 'flex',
        flexDirection: 'row',
    },
}))

const App = () => {
    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const names = useSelector(state => state.names)
    const data = useSelector(state => {
        if (filter === 'NO_FILTER') {
            return state.data
        } else if (filter === 'BLOCKED_FILTER') {
            return state.data.filter(data => data.blocked === 'yes')
        } else if (filter === 'AVAILABLE_FILTER') {
            return state.data.filter(data => data.blocked === 'no')
        } else if (
            filter !== 'NO_FILTER' &&
            filter !== 'BLOCKED_FILTER' &&
            filter !== 'AVAILABLE_FILTER'
        ) {
            return state.data.filter(data => data.name.toLowerCase().includes(filter.toLowerCase()))
        }
    })

    useEffect(() => {
        names.map(name =>
            fetchHelper
                .fetchData(name)
                .then(response => dispatch(getData(response)))
                .catch(e => console.log('error: ', e.message))
        )
        console.log('firing useEffect')
    }, [names, dispatch])

    useEffect(() => {
        stopLoading(names, data)
    })

    const handleFileUpload = e => {
        e.preventDefault()
        setLoading(true)

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

            const list = data.split(/\r\n|\n/)
            const filteredList = list.filter(e => e !== '' && e !== undefined)
            dispatch(getNames(filteredList))
        }
        reader.readAsBinaryString(file)
    }

    const stopLoading = (data, names) => {
        if (data.length > 0 && names.length > 0 && data.length === names.length) {
            setLoading(false)
        }
    }

    console.log('App component names: ', names)
    console.log('App component data: ', data)
    console.log('loading status: ', loading)

    return (
        <Container className={classes.container}>
            <div>
                <Title />
                <Subtitle />
                <Input onChange={handleFileUpload} />
                <div className={classes.filterRow}>
                    <Filter />
                    <FilterCheckBox />
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label='Server Info'>
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

                            {data.map(data => (
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
