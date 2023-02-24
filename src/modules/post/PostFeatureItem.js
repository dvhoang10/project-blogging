import React from "react";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostFeatureItem = ({ data }) => {
  const { category, user } = data;
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="h-[169px] lg:h-[272px] relative">
      <PostImage
        url={data.image}
        alt=""
        className="w-full h-full rounded-2xl"
      ></PostImage>
      <div className="absolute inset-0 post-overlay rounded-2xl mix-blend-multiply opacity-60 bg-blackOverlay"></div>
      <div className="absolute inset-0 p-5 text-white">
        <div className="text-[10px] lg:text-sm flex justify-between items-center mb-4">
          <PostCategory to={category.slug}>{category.name}</PostCategory>
          <PostMeta
            date={formatDate}
            authorName={user?.fullname}
            to={slugify(user?.username || "", { lower: true })}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug}>{data.title}</PostTitle>
      </div>
    </div>
  );
};

PostFeatureItem.prototype = {
  data: Proptypes.object,
};

export default withErrorBoundary(PostFeatureItem, {
  FallbackComponent: ErrorComponent,
});
