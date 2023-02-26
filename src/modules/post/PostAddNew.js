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
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { postStatus } from "utils/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import slugify from "slugify";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

const schema = yup.object({
  title: yup.string().required("Please enter your title"),
});

const PostAddNew = () => {
  useEffect(() => {
    document.title = "Add new post";
  }, []);
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      category: {},
    },
    resolver: yupResolver(schema),
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
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
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    console.log("🚀 ~ cloneValues:", cloneValues);
  };
  return (
    <div>
      <DashboardHeading title="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <FormLayout>
          <Field>
            <Label htmlFor="title">Title *</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
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
            <Label>Image</Label>
            <ImageUpload
              className="h-[250px]"
              image={image}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}
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
          isLoading={isSubmitting}
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
