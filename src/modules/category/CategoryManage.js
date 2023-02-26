import { ActionDelete, ActionEdit, ActionView } from "components/action";
import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";

const CategoryManage = () => {
  return (
    <>
      <DashboardHeading title="Categories" desc="Manage your categories">
        <Button
          className="p-5 h-12 w-[200px] lg:h-[52px]"
          to="manage/add-category"
          kind="secondary"
        >
          Create category
        </Button>
      </DashboardHeading>
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
          <tr>
            <td>01</td>
            <td>Frontend Developer</td>
            <td>
              <em className="text-gray-400">frontend-developer</em>
            </td>
            <td>
              <LabelStatus type="success">Approved</LabelStatus>
            </td>
            <td>
              <div className="flex items-center gap-5">
                <ActionView></ActionView>
                <ActionEdit></ActionEdit>
                <ActionDelete></ActionDelete>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default withErrorBoundary(CategoryManage, {
  FallbackComponent: ErrorComponent,
});
