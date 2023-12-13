import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, setUser, socket }) => {

    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleCreateRoom = (e) => {
        e.preventDefault();

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true
        }
        setUser(roomData);
        navigate(`/${roomId}`);
        console.log("Roomdata", roomData)
        socket.emit("userJoined", roomData)
    }

    return (
        <form action="" className="form col-md-12 mt-5 ">
            <div className="form-group">
                <input type="text" className="form-control my-2" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group border">
                <div className="input-group d-flex align-items-center justify-content-center">
                    <input type="text" className="form-control border-0 my-2 me-1" placeholder="Generate room code" value={roomId} disabled />
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm me-1" onClick={() => setRoomId(uuid())}>
                            Generate
                        </button>
                        <button className="btn btn-outline-danger btn-sm me-1">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" onClick={handleCreateRoom} className="mt-4 btn btn-primary btn-block form-control">Generate Room</button>
        </form>
    );

}

export default CreateRoomForm;