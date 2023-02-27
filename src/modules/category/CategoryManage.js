import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { Table } from "components/table";
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
import CategoryTable from "./CategoryTable";

const CATEOGRY_PER_PAGE = 5;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEOGRY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    document.title = "Manage categories";
  }, []);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEOGRY_PER_PAGE));
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
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <>
      <DashboardHeading
        title="Categories"
        desc="Manage your categories"
      ></DashboardHeading>
      <div className="flex flex-col items-center justify-between mb-10 lg:flex-row">
        <Button
          className="p-5 h-12 max-w-[200px] lg:h-[52px]"
          to="/manage/add-category"
          kind="secondary"
        >
          Create category
        </Button>
        <input
          type="text"
          placeholder="Search category name..."
          className="px-5 py-4 mt-10 border border-gray-300 rounded-lg outline-none lg:mt-0 w-[300px]"
          onChange={handleFilter}
        />
      </div>
      <Table className="text-base">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <CategoryTable data={category}></CategoryTable>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && !filter && (
        <div>
          <Button
            onClick={handleLoadMoreCategory}
            className="p-5 h-12 max-w-[200px] lg:h-[52px] mx-auto mt-10"
            kind="loadmore"
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default withErrorBoundary(CategoryManage, {
  FallbackComponent: ErrorComponent,
});
