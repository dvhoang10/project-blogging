import ErrorComponent from "components/common/ErrorComponent";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PageNotFound from "pages/PageNotFound";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, useParams } from "react-router-dom";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import parse from "html-react-parser";
import slugify from "slugify";
import { AuthorBox } from "components/author";
import { useAuth } from "contexts/auth-context";
import { userRole } from "utils/constant";
import PostRelated from "./PostRelated";

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  const { user } = postInfo;
  const { userInfo } = useAuth();
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  console.log(postInfo.category.id);
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
            {/* if user role is ADMIN then can edit the post */}
            {userInfo?.role === userRole.ADMIN && (
              <Link
                to={`/manage/update-post?id=${postInfo.id}`}
                className="inline-block px-4 py-2 mt-5 text-sm border border-gray-400 rounded-md"
              >
                Edit post
              </Link>
            )}
          </div>
        </div>
        <div className="post-content max-w-[700px] my-10 lg:my-[80px] mx-auto">
          <div className="entry-content">{parse(postInfo.content || "")}</div>
          <AuthorBox userId={user.id}></AuthorBox>
        </div>
        <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
      </div>
    </div>
  );
};

export default withErrorBoundary(PostDetailsPage, {
  FallbackComponent: ErrorComponent,
});
