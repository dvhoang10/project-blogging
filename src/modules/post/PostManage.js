import { Button } from "components/button";
import ErrorComponent from "components/common/ErrorComponent";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import PostTable from "./PostTable";

const POST_PER_PAGE = 5;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    document.title = "Post manage";
  }, []);
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex flex-col items-center justify-between mb-10 lg:flex-row">
        <Button
          className="p-5 h-12 max-w-[200px] lg:h-[52px]"
          to="/manage/add-post"
          kind="secondary"
        >
          Create post
        </Button>
        <input
          type="text"
          placeholder="Search post name..."
          className="px-5 py-4 mt-10 border border-gray-300 rounded-lg outline-none lg:mt-0 w-[300px]"
          onChange={handleFilter}
        />
      </div>
      <PostTable data={postList}></PostTable>
      {total > postList.length && !filter && (
        <div>
          <Button
            onClick={handleLoadMorePost}
            className="p-5 h-12 max-w-[200px] lg:h-[52px] mx-auto mt-10"
            kind="loadmore"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(PostManage, {
  FallbackComponent: ErrorComponent,
});
