import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import DataRow from './DataRow'

const useStyles = makeStyles({
    container: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
    },
    table: {
        minWidth: 650,
        backgroundColor: 'papayawhip',
    },
    headers: {
        fontWeight: 'bold',
    },
})

const DataTable = ({ names, data }) => {
    console.log('DataTable names: ', names)
    console.log('DataTable data: ', data)
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='Server Info'>
                <TableHead className={classes.headers}>
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
                    {data.map(data => (
                        <DataRow data={data} key={data.hostname} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable
