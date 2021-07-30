import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { Button } from '@material-ui/core'

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
            <TableCell>
                <Button variant='contained' color='primary'>
                    offline?
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default DataRow
