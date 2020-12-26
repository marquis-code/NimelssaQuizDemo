import React from 'react'

const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message;
 

/* import React from 'react';

export const showServerErrorMsg = (msg) => {
  return(
    <div className='alert alert-danger' role="alert">
       {msg}
    </div>
  )
}

export const showServerSuccessMsg = (msg) => {
  return(
    <div className='alert alert-success' role="alert">
       {msg}
    </div>
  )
} */