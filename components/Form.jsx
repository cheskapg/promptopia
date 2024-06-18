import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div>
      <section className="flex-start flex-start w-full max-w-full flex-col">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc max-w-md text-left">
          {type === "Create"
            ? "Create and share amazing prompt with the world, and let your imagination run wild with any AI-powered platform."
            : "Update your post to keep the community updated."}
        </p>
        <form
          onSubmit={handleSubmit}
          className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
        >
          <label>
            <span className="font-satoshi text-base font-semibold text-gray-700">
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder="Write your prompt here"
              required
              className="form_textarea"
            />
          </label>

          <label>
            <span className="font-satoshi text-base font-semibold text-gray-700">
              Tags {""}
              <span className="font-normal">
                (#webdevelopment #ideas #aiprompt)
              </span>
            </span>

            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required
              className="form_input"
            />
          </label>
          <div className="flex-end mx-3 mb5 gap-4">
            <Link href="/"
            className="text-gray-500">Cancel</Link>
      <button type="submit" className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">{submitting ?`${type}...` : type}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
