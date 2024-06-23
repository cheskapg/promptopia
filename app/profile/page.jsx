"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [prompts, setPromptList] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data, "data");
      setPromptList(data);
    };
    console.log(prompts, "PROPTsS");
    console.log(session?.user.id, "PROPTS");

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
  
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg);
        }
  
        const filteredPosts = prompts.filter((item) => item._id !== prompt._id);
        setPromptList(filteredPosts);
      } catch (error) {
        console.error('Error deleting prompt:', error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your Personalized Profile Page!"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
