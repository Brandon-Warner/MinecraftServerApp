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

const DataRow = ({ data, loading }) => {
    console.log('DATAROW DATA: ', data)

    const classes = useStyles()

    const hideWhenLoading = loading ? classes.hidden : classes.rows
    console.log('hideWhenLoading', hideWhenLoading)

    return (
        <TableRow className={`${hideWhenLoading}`}>
            <TableCell>{data.name}</TableCell>
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
