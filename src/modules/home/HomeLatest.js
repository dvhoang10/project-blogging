import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostLatestItem from "modules/post/PostLatestItem";
import PostLatestLarge from "modules/post/PostLatestLarge";
import React, { useEffect, useState } from "react";

const HomeLatest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(q, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  const [first, ...rest] = posts;
  return (
    <div>
      <div className="layout-container">
        <Heading>Latest post</Heading>
        <div className="grid items-start grid-cols-1 gap-10 mb-10 lg:grid-cols-2">
          <PostLatestLarge data={first}></PostLatestLarge>
          <div className="px-[10px] py-[14px] lg:px-5 lg:py-7 bg-[#f3edff] rounded-2xl">
            {rest.length > 0 &&
              rest.map((item) => <PostLatestItem data={item}></PostLatestItem>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLatest;
