import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import UserTable from "./UserTable";

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    document.title = "User manage";
  }, []);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : colRef;
      onSnapshot(newRef, (snapShot) => {
        let results = [];
        snapShot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchData();
  }, [filter]);
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex flex-col items-center justify-between mb-10 lg:flex-row">
        <Button
          className="p-5 h-12 max-w-[200px] lg:h-[52px]"
          to="/manage/add-user"
          kind="secondary"
        >
          Create user
        </Button>
        <input
          type="text"
          placeholder="Search user name..."
          className="px-5 py-4 mt-10 border border-gray-300 rounded-lg outline-none lg:mt-0 w-[300px]"
          onChange={handleFilter}
        />
      </div>
      <UserTable data={userList}></UserTable>
    </>
  );
};

export default withErrorBoundary(UserManage, {
  FallbackComponent: ErrorComponent,
});
