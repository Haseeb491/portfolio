"use client";

import BlogForm from "@/components/BlogForm";
import { data } from "autoprefixer";
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

    setResponse({ data: response.data, loading: false });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (response.loading) {
    return <h1>Loading...</h1>;
  }

  return <BlogForm id={params.slug} value={response?.data} />;
};

export default BlogDetailPage;
