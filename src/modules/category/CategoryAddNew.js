import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import ErrorComponent from "components/common/ErrorComponent";
import Field from "components/field/Field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Input from "components/input/Input";
import Label from "components/label/Label";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import FormLayout from "modules/Dashboard/FormLayout";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Please enter category name"),
});

const CategoryAddNew = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add new category";
  }, []);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.APPROVED,
    },
    resolver: yupResolver(schema),
  });
  const watchStatus = watch("status");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const addPostHandler = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.name, { lower: true });
      cloneValues.status = Number(values.status);
      // console.log("🚀 ~ cloneValues:", cloneValues);
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...cloneValues,
        createAt: serverTimestamp(),
      });
      toast.success("Create the new category successfully!");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: categoryStatus.APPROVED,
      });
      setLoading(false);
      navigate("/manage/category");
    }
  };
  return (
    <>
      <DashboardHeading title="Add new category"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <FormLayout>
          <Field>
            <Label htmlFor="name">Name *</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter category name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter the slug of category"
            ></Input>
          </Field>
        </FormLayout>
        <FormLayout>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </FormLayout>
        <Button
          type="submit"
          className="mx-auto w-[250px] h-12 lg:h-[60px] mt-10"
          kind="secondary"
          isLoading={loading}
        >
          Add new category
        </Button>
      </form>
    </>
  );
};

export default withErrorBoundary(CategoryAddNew, {
  FallbackComponent: ErrorComponent,
});
