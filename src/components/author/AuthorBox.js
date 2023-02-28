import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId || !user.username) return null;
  return (
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
  );
};

AuthorBox.prototype = {
  userId: PropTypes.string,
};

export default withErrorBoundary(AuthorBox, {
  FallbackComponent: ErrorComponent,
});
