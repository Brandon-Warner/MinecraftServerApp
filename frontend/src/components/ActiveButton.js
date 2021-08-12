import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles, Button, TableCell, CircularProgress } from '@material-ui/core'
import Modal from 'react-modal'

const useStyles = makeStyles(() => ({
    buttonLoading: {
        color: 'white',
    },
}))

const ActiveButton = ({ hostname }) => {
    const [open, setOpen] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [fetchResponse, setFetchResponse] = useState('')

    const classes = useStyles()

    const customStyles = {
        content: {
            fontFamily: 'Roboto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    const fetchData = async hostname => {
        setButtonLoading(true)
        try {
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
        } catch (error) {
            setFetchResponse('error connecting to server - please try again later')
        }

        setOpen(!open)
        setButtonLoading(false)
    }
    console.log('fetchResponse: ', fetchResponse)

    return (
        <TableCell>
            <Button variant='contained' color='primary' onClick={() => fetchData(hostname)}>
                {buttonLoading ? <CircularProgress className={classes.buttonLoading} /> : 'Active?'}
            </Button>
            <div>
                <Modal
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                    ariaHideApp={false}
                    style={customStyles}
                >
                    <h2>Active Status</h2>
                    {fetchResponse}
                    <br />
                    <br />
                    <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        close
                    </Button>
                </Modal>
            </div>
        </TableCell>
    )
}

export default ActiveButton
