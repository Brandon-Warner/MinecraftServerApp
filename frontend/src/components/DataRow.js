import React from 'react'
import { makeStyles, TableRow, TableCell } from '@material-ui/core'
import ActiveButton from './ActiveButton'

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
            <ActiveButton hostname={data.hostname} />
        </TableRow>
    )
}

export default DataRow
