const CreateRoomForm = () => {
    return (
        <form action="" className="form col-md-12 mt-5 ">
            <div className="form-group">
                <input type="text" className="form-control my-2" placeholder="Enter your name" />
            </div>
            <div className="form-group border">
                <div className="input-group d-flex align-items-center justify-content-center">
                    <input type="text" className="form-control border-0 my-2 me-1" placeholder="Generate room code" disabled />
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm me-1">
                            Generate
                        </button>
                        <button className="btn btn-outline-danger btn-sm me-1">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn btn-primary btn-block form-control">Generate Room</button>
        </form>
    );

}

export default CreateRoomForm;