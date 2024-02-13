"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BlogsPage = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      data: [],
      loading: false,
    }
  );

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs", {
      method: "GET",
    });
    const response = await res.json();

    setResponse({
      data: response.data,
      loading: false,
    });

    console.log(response);
  };

  const deleteBlog = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/blogs", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    if (response?.status === 204) {
      // Reload the list data
      fetchBlogs();
    }

    setLoading(false);
  };

  useEffect(() => {
    setResponse({
      loading: true,
    });
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex mb-5">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-700">Blogs</h2>
        </div>
        <div className=""></div>
      </div>
      {response.loading ? (
        <div className="animate-pulse">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1 mt-3"></div>
        </div>
      ) : (
        <>
          {response.data.length > 0 ? (
            <>
              {response.data.map(
                (d: { title: string; id: string; description: string }) => (
                  <div key={d.id} className="mb-4 flex justify-between group ">
                    <div className="">
                      <Link
                        className="text-xl font-bold text-blue-600"
                        href={`/admin/blogs/${d.id}`}
                      >
                        {d.title}
                      </Link>
                      <p className="text-sm text-gray-300 font-extralight">
                        {d?.description ? d?.description : "no description"}
                      </p>
                    </div>
                    <div className="">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="opacity-0 group-hover:opacity-60">
                            <TrashIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Confirm delete</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete{" "}
                              <span className="font-bold">{d.title}</span>?
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button
                              type="submit"
                              variant={"destructive"}
                              disabled={loading}
                              onClick={() => {
                                deleteBlog(d.id);
                              }}
                            >
                              {loading ? (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default BlogsPage;
