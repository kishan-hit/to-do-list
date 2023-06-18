import React, { useState } from 'react';
import Delete from './Delete';
import Edit from './Edit';

function Message(props) {
    const [checked, setChecked] = useState(false)

    function handleChange() {
        setChecked(!checked)
    }

    function handleDelete() {
        let temp = localStorage.getItem("message")

        let array = JSON.parse(temp)

        array = array.filter((e) => {
            return e !== props.message
        })

        let string = JSON.stringify([...array])

        localStorage.setItem("message", string)
        props.setMsgList(array);
    }
    return (
        <div className='h-fit w-full p-2 rounded-lg bg-gray-300 flex text-lg'>
            <input type="checkbox" value={checked} onClick={handleChange} />
            <div className={`w-[90%] ${checked ? 'line-through text-gray-400' : ''}`}>
                {props.message}
            </div>
            <div className='flex items-center justify-center w-fit h-full'>
                <div className='bg-blue-700 p-1 rounded-2xl cursor-pointer'>
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