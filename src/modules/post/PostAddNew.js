import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import ErrorComponent from "components/common/ErrorComponent";
import { Dropdown } from "components/dropdown";
import Field from "components/field/Field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { Toggle } from "components/toggle";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import FormLayout from "modules/Dashboard/FormLayout";
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
      hot: false,
      category: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
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
        <FormLayout>
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
        </FormLayout>
        <FormLayout>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                <Dropdown.Option>Knowledge</Dropdown.Option>
                <Dropdown.Option>Blockchain</Dropdown.Option>
              </Dropdown.List>
            </Dropdown>
          </Field>
        </FormLayout>
        <FormLayout>
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
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
        </FormLayout>
        <Button
          type="submit"
          className="mx-auto w-[250px] h-12 lg:h-[60px]"
          kind="secondary"
        >
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default withErrorBoundary(PostAddNew, {
  FallbackComponent: ErrorComponent,
});
