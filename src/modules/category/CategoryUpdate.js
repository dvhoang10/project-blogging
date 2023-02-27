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
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Please enter category name"),
});

const CategoryUpdate = () => {
  useEffect(() => {
    document.title = "Update category";
  }, []);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const updateCategory = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.name, { lower: true });
      cloneValues.status = Number(values.status);
      // console.log("🚀 ~ cloneValues:", cloneValues);
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        ...cloneValues,
        createAt: serverTimestamp(),
      });
      toast.success("Update category successfully!");
      navigate("/manage/category");
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
    }
  };
  return (
    <>
      <DashboardHeading
        title="Update category"
        desc={`Update category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateCategory)}>
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
          Update category
        </Button>
      </form>
    </>
  );
};

export default withErrorBoundary(CategoryUpdate, {
  FallbackComponent: ErrorComponent,
});
