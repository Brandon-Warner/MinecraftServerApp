import React, { useState } from 'react'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell'
import { Button } from '@material-ui/core'

const OfflineButton = ({ hostname }) => {
    const [infoVisible, setInfoVisible] = useState(false)
    let offlineResponse

    const hideWhenVisible = { display: infoVisible ? 'none' : '' }
    const showWhenVisible = { display: infoVisible ? '' : 'none' }

    const fetchData = async hostname => {
        const data = await axios.get(
            `http://localhost:8080/api/offlineinfo/${hostname}`
        )
        const response = data.data
        console.log('response: ', response.reason)
        offlineResponse = response.reason
        window.alert(offlineResponse)
    }
    return (
        <TableCell>
            <div style={hideWhenVisible}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        setInfoVisible(true)
                        fetchData(hostname)
                    }}
                >
                    offline?
                </Button>
            </div>
            <div style={showWhenVisible}>
                <Button onClick={() => setInfoVisible(false)}>cancel</Button>
            </div>
        </TableCell>
    )
}

export default OfflineButton
