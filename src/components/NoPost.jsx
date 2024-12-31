import React from 'react'
import { Link } from 'react-router-dom'

function NoPost() {
    return (
        <>
            <Link to={`/add-post`} className='mx-auto '>
                <div className='sm:w-full w-4/5 mx-auto sm:mx-0 my-5 bg-slate-400 h-2/4 border-2 border-slate-600 rounded-xl p-20'>
                    <h1>+ Create New Blog</h1>
                </div>
            </Link>
        </>
    )
}

export default NoPost
