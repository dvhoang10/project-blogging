import ErrorComponent from "components/common/ErrorComponent";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PageNotFound from "pages/PageNotFound";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import parse from "html-react-parser";
import slugify from "slugify";

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  const { user } = postInfo;
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  return (
    <div className="pb-10">
      <div className="layout-container">
        <div className="flex flex-col items-center gap-10 my-10 lg:flex-row">
          <PostImage
            url={postInfo.image}
            className="w-full max-w-[640px] h-auto lg:h-[466px] rounded-[20px]"
          ></PostImage>
          <div>
            <PostCategory className="mb-6" to={postInfo.category?.slug}>
              {postInfo.category?.name}
            </PostCategory>
            <h1 className="mb-4 text-2xl font-semibold lg:text-4xl">
              {postInfo.title}
            </h1>
            <PostMeta
              to={slugify(user?.username || "", { lower: true })}
              authorName={user?.fullname}
              date={formatDate}
            ></PostMeta>
          </div>
        </div>
        <div className="post-content max-w-[700px] my-10 lg:my-[80px] mx-auto">
          <div className="entry-content">{parse(postInfo.content || "")}</div>
          <div className="flex flex-col lg:flex-row mt-10 mb-10 rounded-[20px] bg-grayF3">
            <div className="w-[100px] h-[100px] rounded-full mt-5 mx-auto lg:mt-0 lg:w-[200px] lg:h-[200px] shrink-0 lg:rounded-[inherit]">
              <img
                src={user?.avatar}
                alt=""
                className="w-full h-full object-cover rounded-[inherit]"
              />
            </div>
            <div className="flex-1 p-5 text-center lg:text-left">
              <h3 className="font-semibold mb-[10px] text-[20px]">
                {user?.fullname}
              </h3>
              <p className="leading-loose">{user?.description}</p>
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
