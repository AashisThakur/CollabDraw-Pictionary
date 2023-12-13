import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import WhiteBoard from '../../components/Whiteboard';
import Chat from '../../components/ChatBar';

const RoomPage = ({ user, socket, users }) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [openedUserTab, setOpenedUserTab] = useState(false);
    const [openedChatTab, setOpenedChatTab] = useState(false);

    useEffect(() => {
        return () => {
            socket.emit("userLeft", user.name);
        }
    }, []);

    const handleCanvasClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.fillRect = "white";
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setElements([])
    }

    const undo = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1]
        ]);
        setElements((prevElements) => prevElements.slice(0, prevElements.length - 1));
    }

    const redo = () => {
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1]
        ]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    }
    return (
        <div className="row">
            <button className="btn btn-dark" style={{ display: "block", position: "absolute", top: "5%", left: "5%", height: "40px", width: "100px" }} onClick={() => setOpenedUserTab(true)}>Users</button>
            <button className="btn btn-dark" style={{ display: "block", position: "absolute", top: "10%", left: "5%", height: "40px", width: "100px" }} onClick={() => setOpenedChatTab(true)}>Chat</button>
            {
                openedUserTab && (
                    <div className="position-fixed top-0 left-0 h-100 text-white bg-dark" style={{ width: "250px", left: "0%" }}> <button className="btn btn-light btn-block w-100 mt-5" onClick={() => setOpenedUserTab(false)}>Close</button>
                        <div className='w-100 mt-5 pt-5 text-center'>{users.map((usr, index) => (
                            <p key={index * 999} className='my-2 w-100'>{usr.name} {user && user.userId === usr.userId && "(You)"}</p>
                        ))}</div>
                    </div>
                )
            }
            {
                openedChatTab && (
                    <Chat setOpenedChatTab={setOpenedChatTab} socket={socket} />
                )
            }
            <h1 className='text-center py-4'> White Board Application <span className="text-primary">[Users Online : {users.length}]</span></h1>
            {
                user?.presenter && (<div className="col-md-12 gap-3 mx-auto px-5 mb-3 d-flex align-items-center justify-content-center">
                    <div className="d-flex col-md-2 justify-content-center gap-1">
                        <div className="d-flex gap-1 align-items-center"> <label htmlFor='pencil'>Pencil</label>
                            <input type="radio" name="tool" checked={tool === 'pencil'} id="pencil" value="pencil" onChange={(e) => setTool(e.target.value)} />
                        </div>

                        <div className="d-flex gap-1 align-items-center"> <label htmlFor='line'>Line</label>
                            <input type="radio" name="tool" checked={tool === 'line'} value="line" id="line" onChange={(e) => setTool(e.target.value)} />
                        </div>
                        <div className="d-flex gap-1 align-items-center"> <label htmlFor='rect'>Rect</label>
                            <input type="radio" name="tool" checked={tool === 'rect'} value="rect" id="rect" onChange={(e) => setTool(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="d-flex align-items-center justify-content-center">
                            <label htmlFor='color'>Select Color:  </label>
                            <input type="color" id="color" className='mt-1 ms-3' value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-3 d-flex gap-2">
                        <button className="btn btn-primary mt-1" disabled={elements.length === 0} onClick={undo}>Undo</button>
                        <button className="btn btn-outline-primary mt-1" disabled={history.length < 1} onClick={redo}>Redo</button>
                    </div>
                    <div className="col-md-2"><button className="btn btn-danger" onClick={handleCanvasClear}>Clear Canvas</button></div>
                </div>)
            }

            <div className="col-md-10 mx-auto mt-4 canvas-box">
                <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color} user={user} socket={socket} />
            </div>
        </div>
    );
}

export default RoomPage;