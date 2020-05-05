import io from 'socket.io-client'
import { base } from "./index"
let socket = {}


function socketDispatch(action, data) {
    try {
        socket.emit('dispatch', {
            action,
            data
        })
    } catch (e) {
        console.error('[SOCKET_ERROR]', e)
    }
}

export const SocketStore = {
    state: {
        socket: {}
    },
    mutations: {
        setSocket(state, socket) {
            state.socket = socket
        }
    },
    actions: {
        initializeSocket({ commit, dispatch }, bearer) {
            // establish connection with socket
            socket = io(base)
            commit('setSocket', socket)
                // Handle any on connection events
            socket.on('CONNECTED', () => {
                console.log('connected')
                socket.emit('AUTHENTICATE', bearer)
            })

            socket.on('AUTHENTICATED', (profile) => {
                console.log("CONNECTED TO ECHO", profile)
            })

            socket.on('DISPATCH_ERROR', (err) => {
                if (!err) { return }
                console.error(err)
            })

            socket.on('JOINED_ROOM', room => {
                console.log('JOINED ROOM', room)
            })
            socket.on('LEFT_ROOM', room => {
                console.log('LEFT ROOM', room)
            })

            socket.on('New_Comment', (data) => {
                dispatch('getComments', data.postId)
                console.log('socket.on', data);

            })

        },
        JoinRoom({ commit }, id) {
            socketDispatch('JoinRoom', id)
        },
        LeaveRoom({ commit }, id) {
            socketDispatch('LeaveRoom', id)
        },
    }
}