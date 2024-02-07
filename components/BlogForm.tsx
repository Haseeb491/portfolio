import React from 'react'
import { Editor } from 'novel'

const BlogForm = () => {
    return (
        <Editor
            className='border rounded pb-8'
            disableLocalStorage
            defaultValue=''
        />
    )
}

export default BlogForm