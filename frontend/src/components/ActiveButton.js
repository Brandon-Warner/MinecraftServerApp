import React, { useState } from 'react'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell'
import { Button } from '@material-ui/core'
import Modal from 'react-modal'

const ActiveButton = ({ hostname, classes }) => {
    const [open, setOpen] = useState(false)
    const [fetchResponse, setFetchResponse] = useState('')

    const fetchData = async hostname => {
        const data = await axios.get(`http://localhost:8080/api/offlineinfo/${hostname}`)
        const response = data.data
        console.log('ACTIVE BUTTON response: ', response)
        if (!response.success) {
            setFetchResponse('Error while checking offline-mode status')
        } else if (response.offlineMode) {
            setFetchResponse('Server is using offline mode')
        } else {
            setFetchResponse(
                "Server aborted the join process, it's either using online mode or a whitelist"
            )
            if (response.reason) {
                fetchResponse.concat(`reason was: ${response.reason}`)
            }
        }

        setOpen(!open)
    }
    console.log('fetchResponse: ', fetchResponse)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <TableCell>
            <Button variant='contained' color='primary' onClick={() => fetchData(hostname)}>
                Active?
            </Button>
            <div>
                <Modal
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                    ariaHideApp={false}
                    style={customStyles}
                >
                    <h2>Is Server Active?</h2>
                    {fetchResponse}
                    <br />
                    <Button variant='outlined' color='secondary' onClick={() => setOpen(!open)}>
                        close
                    </Button>
                </Modal>
            </div>
        </TableCell>
    )
}

export default ActiveButton
