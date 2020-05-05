import SocketIO from "socket.io";
import auth0provider from "@bcwdev/auth0provider";
import { profilesService } from "./ProfilesService"
class SocketService {
    io = SocketIO();
    /**
     * @param {SocketIO.Server} io
     */
    setIO(io) {
        try {
            this.io = io;
            //Server listeners
            io.on("connection", this._onConnect());
        } catch (e) {
            console.error("[SOCKETSTORE ERROR]", e);
        }
    }

    /**
     * @param {SocketIO.Socket} socket
     */
    async Authenticate(socket, bearerToken) {
        try {
            let user = await auth0provider.getUserInfoFromBearerToken(bearerToken);
            let profile = await profilesService.findProfile(user.email);
            socket["user"] = user;
            if (!profile.id) {
                // @ts-ignore
                profile = { name: user.name, email: user.email, picture: user.picture };
            }
            socket["userProfile"] = profile;
            this.JoinRoom(socket, user.email);
            socket.emit("AUTHENTICATED", socket["userProfile"]);
            this.io.emit("UserConnected", profile);
        } catch (e) {
            socket.emit("error", e);
        }
    }

    /**
     * @param {SocketIO.Socket} socket
     * @param {string} room
     */
    JoinRoom(socket, room) {
            socket.join(room);
            socket.emit("JOINED_ROOM", room)
        }
        /**
         * @param {SocketIO.Socket} socket
         * @param {string} room
         */
    LeaveRoom(socket, room) {
        socket.leave(room);
        socket.emit("LEFT_ROOM", room)
    }

    /**
     * Sends a direct message to a user
     * @param {string} userId
     * @param {string} eventName
     * @param {any} payload
     */
    messageUser(userId, eventName, payload) {
        try {
            this.io.to(userId).emit(eventName, payload);
        } catch (e) {}
    }

    messageRoom(room, eventName, payload) {
        this.io.to(room).emit(eventName, payload);
    }


    //#region SOCKET CONFIG

    _onConnect() {
        return socket => {
            this._newConnection(socket);

            // STUB Register listeners

            socket.on("dispatch", (payload) => {
                try {
                    this._onDispatch(socket, payload)
                } catch (e) {
                    socket.emit("DISPATCH_ERROR", e.message)
                }
            });
            socket.on("disconnect", socket => {
                try {
                    this._onDisconnect(socket)
                } catch (e) {
                    console.error(e)
                }
            });
        };
    }

    _onDisconnect(socket) {
        return () => {
            try {
                if (!socket.user) {
                    return;
                }
                this.io.emit("UserDisconnected", socket.user.id);
            } catch (e) {}
        };
    }

    _onDispatch(socket, payload = {}) {
        try {
            if (!socket.user) {
                return socket.emit("NO_AUTH", payload)
            }
            let action = this[payload.action];
            if (!action || typeof action != "function") {
                return socket.emit("DISPATCH_ERROR", "Unknown Action");
            }
            action.call(this, socket, payload.data);
        } catch (e) {
            socket.emit("DISPATCH_ERROR", e.message)
        }
    }


    _newConnection(socket) {
            //Handshake / Confirmation of Connection
            socket.on('AUTHENTICATE', bearer => {
                this.Authenticate(socket, bearer)
            })
            socket.emit("CONNECTED", {
                socket: socket.id,
                message: "Successfully Connected"
            });
        }
        //#endregion

}

const socketService = new SocketService();

export default socketService;