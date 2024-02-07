import React from 'react'

interface BlogProps {
    params: {
        slug: string,
    }
}

const Blog = ({ params }: BlogProps) => {
    return (
        <div>Blog</div>
    )
}

export default Blog