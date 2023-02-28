import ErrorComponent from "components/common/ErrorComponent";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "modules/post/PostItem";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);
  if (posts.length <= 0) return null;
  return (
    <div className="layout-container">
      <div className="my-10">
        <Heading>Category: {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(CategoryPage, {
  FallbackComponent: ErrorComponent,
});
