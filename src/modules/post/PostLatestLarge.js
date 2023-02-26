import React from "react";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostLatestLarge = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div>
      <PostImage
        className="mb-5 h-[250px] lg:h-[433px] rounded-2xl block"
        url={data?.image}
        alt=""
        to={data?.slug}
      ></PostImage>
      <PostCategory to={data?.category?.slug} className="mb-[10px]">
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} className="mb-5" size="large">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        authorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </div>
  );
};

PostLatestLarge.prototype = {
  data: PropTypes.object,
};

export default withErrorBoundary(PostLatestLarge, {
  FallbackComponent: ErrorComponent,
});
