import React from 'react'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell'
import { Button } from '@material-ui/core'

const ActiveButton = ({ hostname }) => {
    let offlineResponse

    const fetchData = async hostname => {
        const data = await axios.get(`http://localhost:8080/api/offlineinfo/${hostname}`)
        const response = data.data
        console.log('ACTIVE BUTTON response: ', response)
        offlineResponse = response.reason
        window.alert(offlineResponse)
    }
    return (
        <TableCell>
            <Button variant='contained' color='primary' onClick={() => fetchData(hostname)}>
                Active?
            </Button>
        </TableCell>
    )
}

export default ActiveButton
