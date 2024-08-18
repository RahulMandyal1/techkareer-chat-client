import React from "react"

const Avatar = ({ size = 50, src }) => {
  return (
    <div className={`rounded-full w-[${size}px] h-[${size}px] overflow-hidden`}>
      <img
        src={
          src
            ? src
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className="w-10 h-10 rounded-full object-cover"
        width={size}
        height={size}
      />
    </div>
  )
}

export default Avatar
