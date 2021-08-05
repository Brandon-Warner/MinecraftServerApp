import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import OfflineButton from './OfflineButton'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    },
    rows: {
        backgroundColor: 'white',
    },
}))

const DataRow = ({ data, name, loading }) => {
    console.log('DATAROW DATA: ', data)
    console.log('DATAROW NAME: ', name)

    const classes = useStyles()

    const hideWhenLoading = loading ? classes.hidden : classes.rows
    console.log('hideWhenLoading', hideWhenLoading)

    return (
        <TableRow className={`${hideWhenLoading}`} key={name}>
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
    )
}

export default DataRow
