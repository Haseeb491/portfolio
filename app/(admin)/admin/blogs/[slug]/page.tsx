import BlogForm from '@/components/BlogForm'
import React from 'react'

interface BlogDetailPageProps {
    params: {
        slug: string,
    }
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
    return (
        <BlogForm id={params.slug} />
    )
}

export default BlogDetailPage