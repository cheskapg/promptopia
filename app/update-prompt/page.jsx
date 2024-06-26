"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import Form from "@components/Form";
// const editPrompt = async (e) => {
//   e.preventDefault();
//   setSubmitting(true); //LOADER
//   if (!prompt.id) return alert("Prompt ID is not Found");

//   try {
//     const response = await fetch(`/api/prompt/${promptId}`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         prompt: post.prompt,
//         tag: post.tag,
//       }),
//     });
//     if (response.ok) {
//       router.push("/");
//     }
//   } catch {
//     console.log("something went wrong");
//   } finally {
//     setSubmitting(false);
//   }
// };
const updatePage = () => {
 
  return (
    <Suspense fallback={<><p>Loading...</p></>}>
      <EditPrompt />
    </Suspense>
  );
};

export default updatePage;

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    tag: "",
    content: "",
  });

  useEffect(() => {
    const getPromptInfo = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) {
      getPromptInfo();
    }
  }, [promptId]);
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); //LOADER
    if (!promptId) return alert("Prompt ID is not Found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
  );
};

