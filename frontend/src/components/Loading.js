import { makeStyles, TableRow, TableCell } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    },
    rows: {
        backgroundColor: 'white',
    },
}))

const Loading = ({ loading, name }) => {
    const classes = useStyles()
    const showWhenLoading = loading ? classes.rows : classes.hidden
    return (
        <TableRow key={name} className={`${showWhenLoading}`}>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
            <TableCell>
                <LinearProgress />
            </TableCell>
        </TableRow>
    )
}

export default Loading
