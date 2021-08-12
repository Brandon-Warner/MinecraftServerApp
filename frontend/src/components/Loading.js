import LinearProgress from '@material-ui/core/LinearProgress'
import { TableRow, TableCell } from '@material-ui/core'

const Loading = ({ loading, name, classes }) => {
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
