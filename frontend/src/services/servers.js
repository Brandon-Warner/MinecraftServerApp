import axios from 'axios'

const baseUrl = 'http://localhost:8080/api'

const isOnline = data => (data === true ? 'yes' : 'no')
const isPlayersOnline = data => {
    if (data.online === false) {
        return 'N/A'
    }
    return data.players.online
}
const isPlayersMax = data => {
    if (data.online === false) {
        return 'N/A'
    }
    return data.players.max
}
const isBlocked = data => (data === true ? 'yes' : 'no')

const fetchData = async name => {
    console.log('fetchData name: ', name)
    const server_data = await axios.get(`${baseUrl}/serverinfo/${name}`)
    const serverInfo = server_data.data

    const block_data = await axios.get(`${baseUrl}/blockinfo/${name}`)
    const blockInfo = block_data.data

    // const offline_data = await axios.get(
    //     `http://localhost:8080/api/offlineinfo/${name.name}`
    // )
    // const offlineInfo = offline_data.data

    console.log('fetch data: ', serverInfo, blockInfo)

    const allData = {
        hostname: serverInfo.hostname,
        online: isOnline(serverInfo.online),
        ip: serverInfo.ip,
        version: serverInfo.version || 'N/A',
        playersOnline: isPlayersOnline(serverInfo),
        playersMax: isPlayersMax(serverInfo),
        blocked: isBlocked(blockInfo.blocked),
        blockTime: blockInfo.lastBlocked || 'N/A',
        offlineMode: 'N/A',
    }
    console.log('allData: ', allData)
    return allData
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchData }
