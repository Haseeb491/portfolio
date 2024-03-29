"use client";

import React, { useCallback, useReducer, useState } from "react";
import { Editor } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter, redirect } from "next/navigation";

interface BlogFormProps {
  id: string;
  value: {
    title: string;
    content: string;
    description: string;
  };
}

const BlogForm = ({ id, value }: BlogFormProps) => {
  const router = useRouter();
  const [blogForm, setBlogForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      title: value?.title || "",
      content: value?.content || "",
      description: value?.description || "",
    }
  );

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const updateContent = useCallback((data: any) => {
    setBlogForm({ content: data.getJSON() });
  }, []);

  const onSubmit = async () => {
    let req;

    if (id) {
      req = await fetch(`/api/blogs?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(blogForm),
      });
    } else {
      req = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(blogForm),
      });
    }

    const response = await req.json();

    if (response) {
      router.push("/admin/blogs");
    }
  };

  return (
    <>
      <div className="">
        <Label htmlFor="email">Title</Label>
        <Input
          type="text"
          placeholder="title"
          value={blogForm.title}
          onChange={(e) => {
            setBlogForm({ title: e.target.value });
          }}
          className="mt-2"
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          placeholder="description"
          value={blogForm.description}
          onChange={(e) => {
            setBlogForm({ description: e.target.value });
          }}
          className="mt-2"
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="email">Content</Label>
        <Editor
          editorProps={{}}
          onDebouncedUpdate={updateContent}
          className="border rounded pb-8 mt-2"
          disableLocalStorage
          defaultValue={blogForm.content}
        />
      </div>
      <div className="mt-4">
        <Button variant={"secondary"} className="bg-gray-200">
          Cancel
        </Button>
        <Button className="bg-gray-800 text-gray-100 ml-5 " onClick={onSubmit}>
          <CheckIcon className="mr-3" />
          Save
        </Button>
      </div>
    </>
  );
};

export default BlogForm;
