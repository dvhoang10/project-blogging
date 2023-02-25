import React from "react";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostItem = ({ data }) => {
  if (!data) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex flex-col items-start">
      <PostImage
        url={data.image}
        alt=""
        to={data.slug}
        className="lg:h-[202px] aspect-video lg:aspect-auto mb-5 block w-full rounded-2xl"
      ></PostImage>
      <PostCategory to={data.category?.slug} className="mb-[10px]">
        {data.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} className="mb-5">
        {data.title}
      </PostTitle>
      <PostMeta
        to={slugify(data.user?.username || "", { lower: true })}
        authorName={data.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </div>
  );
};

PostItem.prototype = {
  data: Proptypes.object,
};

export default withErrorBoundary(PostItem, {
  FallbackComponent: ErrorComponent,
});
