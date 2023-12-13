import React, { useEffect } from 'react'

const Chat = ({ setOpenedChatTab, socket }) => {

    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("null");

    useEffect(() => {
        socket.on("messageResponse", (data) => {
            setChat((prevChats) => [...prevChats, data]);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            socket.emit("message", message);
            setChat((prevChats) => [...prevChats, { message, user: "You" }]);
            setMessage("")
        }
    }

    return (
        <div className="position-fixed top-0 left-0 h-100 text-white bg-dark" style={{ width: "400px", left: "0%" }}> <button className="btn btn-light btn-block w-100 mt-5" onClick={() => setOpenedChatTab(false)}>Close</button>
            <div className='w-100 mt-5 p-2 border border-1 border-white rounded-3' style={{ height: "70%" }}>
                {
                    chat.map((msg, index) => (
                        <p key={index * 999} className="my-2 text-center w-100" >
                            {msg.name}: {msg.message}
                        </p>
                    ))
                }
            </div>
            <form onSubmit={handleSubmit} className='w-100 mt-4 d-flex rounded-3'>
                <input type='text' placeholder='Enter Message' className='h-100 border-0 rounded-0 py-3 px-4' style={{
                    width: "90%",
                }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='btn btn-primary rounded-0'>Send</button>
            </form>
        </div>
    )
}

export default Chat