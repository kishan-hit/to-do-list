import React, { useEffect, useState } from 'react';
import Plus from './Plus';
import Message from './Message';

function HomePage() {
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const [editMsg, setEditMsg] = useState("");

    function handleSubmit() {
        if (msg) {
            setMsgList([...msgList, { msg: msg, isDeleted: false }])
            let data = JSON.stringify([...msgList, { msg: msg, isDeleted: false }])
            localStorage.setItem("message", data)
            setMsg("")
        }
    }
    function handleEditChange() {
        if(!msg){
            setEditMsg("");
            return;
        }
        let tempStr = localStorage.getItem("message");
        let tempArr = JSON.parse(tempStr)
        
        tempArr.forEach(element => {
            if(element.msg === editMsg){
                element.msg = msg;
            }
        });
        

        let data = JSON.stringify(tempArr);
        localStorage.setItem("message", data);
        setMsgList(tempArr)
        setMsg("")
        setEditMsg("")
    }

    function checkKey(e) {
        if (e.key === 'Enter')
            editMsg? handleEditChange() : handleSubmit();
    }
    useEffect(() => {
        let tempStr = localStorage.getItem("message");
        if (tempStr) {
            let tempArr = JSON.parse(tempStr)
            tempArr && setMsgList(tempArr)
        }
    }, [])
    return (
        <div className='bg-red-400 h-screen w-screen flex items-center justify-center '>
            <div className='h-[70%] w-[60%] shadow-2xl'>
                <div className='h-[10%] flex items-center justify-center space-x-3 bg-red-700 rounded-t-lg'>
                    <input type='text' value={msg} placeholder='Enter your text' onChange={(e) => setMsg(e.target.value)} className='h-[5vh] w-[40%] rounded-xl px-2 outline-none' onKeyPress={checkKey} />
                    <div className='flex items-center justify-center w-fit h-full'>
                        <div className='bg-green-700 p-1 rounded-2xl cursor-pointer' onClick={editMsg ? handleEditChange : handleSubmit}>
                            <Plus height="20px" fill="white" />
                        </div>
                    </div>
                </div>
                <div className='h-[90%] px-4 py-2 bg-white rounded-b-lg space-y-2 overflow-scroll scrollbar-hide'>
                    {msgList.map((inp, ind) => {
                        return <Message key={ind} message={inp} setMsgList={setMsgList} setMsg={setMsg} setEditMsg={setEditMsg} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomePage