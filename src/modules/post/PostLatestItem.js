import React from "react";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostLatestItem = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex items-center gap-5 pb-[14px] mb-[14px] lg:pb-7 lg:mb-7 border-b border-b-[#ddd] last:pb-0 last:mb-0 last:border-b-0">
      <PostImage
        url={data.image}
        alt=""
        to={data?.slug}
        className="block shrink-0 w-[140px] h-[100px] lg:w-[180px] lg:h-[130px] rounded-xl"
      ></PostImage>
      <div className="flex-1">
        <PostCategory
          to={data?.category?.slug}
          type="secondary"
          className="mb-2"
        >
          {data.category?.name}
        </PostCategory>
        <PostTitle to={data?.slug} className="mb-2">
          {data.title}
        </PostTitle>
        <PostMeta
          to={slugify(data?.user?.username || "", { lower: true })}
          authorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
    </div>
  );
};

PostLatestItem.prototype = {
  data: Proptypes.object,
};

export default withErrorBoundary(PostLatestItem, {
  FallbackComponent: ErrorComponent,
});
