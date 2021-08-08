import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import OfflineButton from './ActiveButton'

const DataRow = ({ data, loading, classes }) => {
    console.log('DATAROW DATA: ', data)

    const hideWhenLoading = loading ? classes.hidden : classes.rows

    return (
        <TableRow className={`${hideWhenLoading}`}>
            <TableCell position='sticky'>{data.name}</TableCell>
            <TableCell>{data.hostname}</TableCell>
            <TableCell>{data.online}</TableCell>
            <TableCell>{data.ip}</TableCell>
            <TableCell>{data.version}</TableCell>
            <TableCell>{data.playersOnline}</TableCell>
            <TableCell>{data.playersMax}</TableCell>
            <TableCell>{data.blocked}</TableCell>
            <TableCell>{data.blockTime}</TableCell>
            <OfflineButton hostname={data.hostname} />
        </TableRow>
    )
}

export default DataRow
