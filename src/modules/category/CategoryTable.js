import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constant";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import { Table } from "components/table";

const CategoryTable = ({ data }) => {
  const navigate = useNavigate();
  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };
  const renderCategory = (category) => {
    return (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <span className="italic text-gray-400">{category.slug}</span>
        </td>
        <td>
          {Number(data.status) === categoryStatus.APPROVED && (
            <LabelStatus type="success">Approved</LabelStatus>
          )}{" "}
          {Number(data.status) === categoryStatus.UNAPPROVED && (
            <LabelStatus type="warning">Unapproved</LabelStatus>
          )}
        </td>
        <td>
          <div className="flex items-center gap-5">
            <ActionEdit
              onClick={() =>
                navigate(`/manage/update-category?id=${category.id}`)
              }
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleDeleteCategory(category.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <>
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
          {data.length > 0 && data.map((category) => renderCategory(category))}
        </tbody>
      </Table>
    </>
  );
};

CategoryTable.prototype = {
  data: PropTypes.object,
};

export default withErrorBoundary(CategoryTable, {
  FallbackComponent: ErrorComponent,
});
