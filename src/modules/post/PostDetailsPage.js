import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";

const PostDetailsPage = () => {
  return (
    <div className="pb-10">
      <div className="layout-container">
        <div className="flex flex-col items-center justify-between gap-10 my-10 lg:flex-row">
          <PostImage
            url="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            className="w-full max-w-[640px] h-auto lg:h-[466px] rounded-[20px]"
          ></PostImage>
          <div>
            <PostCategory className="mb-6">Knowledge</PostCategory>
            <h1 className="mb-4 text-2xl font-semibold lg:text-4xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
              sit.
            </h1>
            <PostMeta date="010101" authorName="dvhoang"></PostMeta>
          </div>
        </div>
        <div className="post-content max-w-[700px] my-10 lg:my-[80px] mx-auto">
          <div className="entry-content">
            <h2>Chapter 1</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              nesciunt vel qui assumenda fuga magni illo distinctio animi odio?
              Rem pariatur adipisci, minima aperiam veniam asperiores vero non
              hic porro.
            </p>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
              <figcaption>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </figcaption>
            </figure>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
              suscipit nobis ab ipsam explicabo eveniet inventore similique
              labore consequatur, expedita velit impedit dignissimos tenetur?
              Deleniti repellendus rerum soluta laborum unde voluptatem quidem
              pariatur possimus eos, accusamus voluptatum aperiam esse inventore
              error eaque vitae facilis dolor quia excepturi a officia
              temporibus.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row mt-10 mb-10 rounded-[20px] bg-grayF3">
            <div className="w-[100px] h-[100px] rounded-full mt-5 mx-auto lg:mt-0 lg:w-[200px] lg:h-[200px] shrink-0 lg:rounded-[inherit]">
              <img
                src="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt=""
                className="w-full h-full object-cover rounded-[inherit]"
              />
            </div>
            <div className="flex-1 p-5 text-center lg:text-left">
              <h3 className="font-semibold mb-[10px] text-[20px]">dvhoang</h3>
              <p className="leading-loose">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, velit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(PostDetailsPage, {
  FallbackComponent: ErrorComponent,
});
