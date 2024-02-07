import React from 'react'

interface ProjectProps {
    params: {
        slug: string,
    }
}

const Project = ({ params }: ProjectProps) => {
    return (
        <div>Project</div>
    )
}

export default Project