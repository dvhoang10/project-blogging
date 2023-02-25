import { Radio } from "components/checkbox";
import ErrorComponent from "components/common/ErrorComponent";
import Field from "components/field/Field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Input from "components/input/Input";
import Label from "components/label/Label";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { postStatus } from "utils/constant";

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
    },
  });
  const watchStatus = watch("status");
  const addPostHandler = async (values) => {
    console.log("🚀 ~ values:", values);
  };
  useEffect(() => {
    document.title = "Add new post";
  }, []);
  return (
    <div>
      <DashboardHeading title="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter the title of post"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter the slug of post"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default withErrorBoundary(PostAddNew, {
  FallbackComponent: ErrorComponent,
});
