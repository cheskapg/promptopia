"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ promptList, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {promptList.map((prompt,index) => (
        <PromptCard
          key={index}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [promptList, setPromptList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (e) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPromptList(data);
      console.log(data, 'PROPTS');
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a prompt"
          value={searchText}
          onChange={handleSearchTextChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList promptList={promptList}  />
    </section>
  );
};

export default Feed;
