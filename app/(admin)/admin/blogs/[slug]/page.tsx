"use client";

import BlogForm from "@/components/BlogForm";
import React, { useEffect, useReducer } from "react";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  const [response, setResponse] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      loading: true,
    }
  );

  const fetchBlog = async () => {
    const response = await fetch(`/api/blogs?id=${params.slug}`).then((res) =>
      res.json()
    );

    console.log(response.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return <BlogForm id={params.slug} />;
};

export default BlogDetailPage;
