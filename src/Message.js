import React from 'react';
import Delete from './Delete';
import Edit from './Edit';

function Message(props) {
    function handleChange() {
        let temp = localStorage.getItem("message")
        let array = JSON.parse(temp)
        array.forEach(element => {
            if (element.msg === props.message.msg) {
                element.isDeleted = !element.isDeleted;
                props.message.isDeleted = !props.message.isDeleted
            }
        });
        let string = JSON.stringify([...array])
        localStorage.setItem("message", string)
        props.setMsgList(array);
    }

    function handleEdit(){
        props.setMsg(props.message.msg);
        props.setEditMsg(props.message.msg);
    }

    function handleDelete() {
        let temp = localStorage.getItem("message")
        let array = JSON.parse(temp)
        array = array.filter((e) => {
            return e.msg !== props.message.msg
        })
        let string = JSON.stringify([...array])
        localStorage.setItem("message", string)
        props.setMsgList(array);
    }

    return (
        <div className='h-fit w-full p-2 rounded-lg bg-gray-300 flex space-x-2 text-lg'>
            <input type="checkbox" onChange={handleChange} />
            <div className={`w-[90%] ${props.message.isDeleted ? 'line-through text-gray-400' : ''}`}>
                {props.message.msg}
            </div>
            <div className='flex items-center justify-center w-fit h-full'>
                <div className='bg-blue-700 p-1 rounded-2xl cursor-pointer' onClick={handleEdit}>
                    <Edit height="20px" fill="white" />
                </div>
            </div>
            <div className='flex items-center justify-center w-fit h-full'>
                <div className='bg-red-700 p-1 rounded-2xl cursor-pointer' onClick={handleDelete}>
                    <Delete height="20px" fill="white" />
                </div>
            </div>
        </div>
    )
}

export default Message