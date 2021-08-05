import React from 'react'
import { TableBody, TableRow, TableCell } from '@material-ui/core'
import OfflineButton from './OfflineButton'

const DataRow = ({ data, name }) => {
    console.log('DATAROW DATA: ', data)
    console.log('DATAROW NAME: ', name)

    return (
        <TableBody>
            <TableRow key={name}>
                <TableCell>{data.name}</TableCell>
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
        </TableBody>
    )
}

export default DataRow
