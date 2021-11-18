import React, { useState, useEffect } from "react"

const TheRegister = () => {

  return (
    <div className="bg-black text-white h-screen overflow-scroll">
      <div className="flex flex-col pt-20">
        <p className="text-6xl bold mb-10 text-center">The Register</p>
        <p className="ml-36 mb-5">Congratulations, you are a proud owner of a hammer.</p>
        <p className="ml-36 mb-5">You can now apply to join The Forge.</p>
        <p className="ml-36 mb-5">Fill in the form below and our knights will reach out to you in the upcoming days with a decision.</p>
      </div>
      <div className="ml-36 mb-5 bg-white w-6/12 h-3/6">
        <p className="ml-36 mb-5 text-black">A beautiful soon to be added form</p>
      </div>
    </div>
  )
}

export default TheRegister;