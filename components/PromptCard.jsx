import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const router = useRouter();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleProfileClick = () => {
    if (prompt.creator._id === session?.user.id) return router.push("/profile");

    router.push(
      `/profile/${prompt.creator._id}?name=${prompt.creator.username}`,
    );
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
          <Image
            src={prompt.creator.image}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
