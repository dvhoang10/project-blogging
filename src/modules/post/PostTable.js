import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postStatus } from "utils/constant";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostTable = ({ data }) => {
  const navigate = useNavigate();
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  async function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  }
  const renderPost = (post) => {
    const date = post?.createdAt?.seconds
      ? new Date(post?.createdAt?.seconds * 1000)
      : new Date();
    const formatDate = new Date(date).toLocaleDateString("vi-VI");
    return (
      <tr key={post.id}>
        <td>{post.id?.slice(0, 5) + "..."}</td>
        <td className="!pr-[100px]">
          <div className="flex items-center gap-x-3">
            <img
              src={post.image}
              alt=""
              className="w-[66px] h-[55px] rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{post.title}</h3>
              <time className="text-sm text-gray-500">Date: {formatDate}</time>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-500">{post.category?.name}</span>
        </td>
        <td>
          <span className="text-gray-500">{post.user?.username}</span>
        </td>
        <td>{renderPostStatus(post.status)}</td>
        <td>
          <div className="flex items-center text-gray-500 gap-x-3">
            <ActionView onClick={() => navigate(`/${post.slug}`)}></ActionView>
            <ActionEdit
              onClick={() => navigate(`/manage/update-post?id=${post.id}`)}
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleDeletePost(post.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table className="text-base">
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{data.length > 0 && data.map((post) => renderPost(post))}</tbody>
      </Table>
    </div>
  );
};

PostTable.prototype = {
  data: PropTypes.object,
};

export default withErrorBoundary(PostTable, {
  FallbackComponent: ErrorComponent,
});
