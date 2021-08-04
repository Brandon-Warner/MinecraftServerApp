import LinearProgress from '@material-ui/core/LinearProgress'
import { TableRow, TableCell } from '@material-ui/core'

const Loading = () => {
    return (
        <TableRow>
            <TableCell>
                <LinearProgress />
            </TableCell>
        </TableRow>
    )
}

export default Loading
