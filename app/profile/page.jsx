"use client";
import React from "react";
import { useState,Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
const profilePage = () => {
  return (
    <Suspense fallback={<><p>Loading...</p></>}>
      <MyProfile />
    </Suspense>
  );
}
export default profilePage;

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [prompts, setPromptList] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log(data, "data");
      setPromptList(data);
    };
    console.log(prompts, "PROPTsS");
    console.log(userId, "userId");

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?",
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg);
        }

        const filteredPosts = prompts.filter((item) => item._id !== prompt._id);
        setPromptList(filteredPosts);
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };
  const creatorUsername =
    prompts.length > 0 ? `${prompts[0].creator.username}'s Profile`: "";

  return (
    <Profile
    name={session?.user.id ===userId ? "My Profile" :  `${creatorUsername}`}
    desc="Welcome to your Personalized Profile Page!"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

