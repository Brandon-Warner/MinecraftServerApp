import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import OfflineButton from './OfflineButton'

const DataRow = ({ data, name }) => {
    console.log('DATAROW DATA: ', data)
    console.log('DATAROW NAME: ', name)

    return (
        <TableRow key={name}>
            <TableCell>{data.hostname}</TableCell>
            <TableCell>{data.online}</TableCell>
            <TableCell>{data.ip}</TableCell>
            <TableCell>{data.version}</TableCell>
            <TableCell>{data.playersOnline}</TableCell>
            <TableCell>{data.playersMax}</TableCell>
            <TableCell>{data.blocked}</TableCell>
            <TableCell>{data.blockTime}</TableCell>
            {data.length === 0 ? null : <OfflineButton hostname={data.hostname} />}
        </TableRow>
    )
}

export default DataRow
