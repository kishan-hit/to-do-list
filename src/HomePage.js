import React, { useEffect, useState } from 'react';
import Plus from './Plus';
import Message from './Message';

function HomePage() {
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);

    function handleSubmit() {
        setMsgList([...msgList,{msg: msg, isDeleted: false}])
        let data = JSON.stringify([...msgList, {msg: msg, isDeleted: false}])
        localStorage.setItem("message",data)
        setMsg("")
    }
    function checkKey(e){
        if(e.key === 'Enter')
            handleSubmit();
    }
    useEffect(()=>{
        let tempStr = localStorage.getItem("message");
        if(tempStr){
        let tempArr = JSON.parse(tempStr)
        tempArr && setMsgList(tempArr)
        }
    },[])
    return (
        <div className='bg-red-400 h-screen w-screen flex items-center justify-center '>
            <div className='h-[70%] w-[60%] shadow-2xl'>
                <div className='h-[10%] flex items-center justify-center space-x-3 bg-red-700 rounded-t-lg'>
                    <input type='text' value={msg} placeholder='Enter your text' onChange={(e)=>setMsg(e.target.value)} className='w-[60%] rounded-xl px-2' onKeyPress={checkKey} />
                    <div className='flex items-center justify-center w-fit h-full'>
                        <div className='bg-green-700 p-1 rounded-2xl cursor-pointer' onClick={handleSubmit}>
                            <Plus height="20px" fill="white" />
                        </div>
                    </div>
                </div>
                <div className='h-[90%] px-4 py-2 bg-white rounded-b-lg space-y-2 overflow-scroll scrollbar-hide'>
                   { msgList.map((inp,ind)=>{
                        return <Message key={ind} message={inp.msg} setMsgList={setMsgList} />
                    }) }
                </div>
            </div>
        </div>
    )
}

export default HomePage