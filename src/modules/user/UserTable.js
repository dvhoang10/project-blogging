import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "utils/constant";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const UserTable = ({ data }) => {
  const navigate = useNavigate();
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const renderUser = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user?.avatar}
              alt=""
              className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
            />
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-300">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td>{user?.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderRoleLabel(Number(user?.role))}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => {}}></ActionDelete>
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
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{data.length > 0 && data.map((user) => renderUser(user))}</tbody>
      </Table>
    </div>
  );
};

UserTable.prototype = {
  data: PropTypes.object,
};

export default withErrorBoundary(UserTable, {
  FallbackComponent: ErrorComponent,
});
