import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "modules/Dashboard/DashboardHeading";
import FormLayout from "modules/Dashboard/FormLayout";
import Field from "components/field/Field";
import { Label } from "components/label";
import Input from "components/input/Input";
import ImageUpload from "components/image/ImageUpload";
import { Dropdown } from "components/dropdown";
import { Toggle } from "components/toggle";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { postStatus } from "utils/constant";
import { Radio } from "components/checkbox";
import { Button } from "components/button";
import { toast } from "react-toastify";
import slugify from "slugify";

const schema = yup.object({
  title: yup.string().required("Please enter your title"),
});

const PostUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const postId = params.get("id");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  async function deleteImage() {
    const colRef = doc(db, "users", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }
  const {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues, imageName, deleteImage);
  useEffect(() => {
    document.title = "Update post";
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
    async function fetchData() {
      if (!postId) return;
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      if (docData.data()) {
        reset(docData.data());
        setSelectCategory(docData.data()?.category || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleUpdatePost = async (values) => {
    if (!isValid) return;
    try {
      const docRef = doc(db, "posts", postId);
      values.status = Number(values.status);
      values.slug = slugify(values.slug || values.title, { lower: true });
      await updateDoc(docRef, {
        ...values,
        image,
      });
      toast.success("Update post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        category: {},
        image: "",
        user: {},
      });
      setSelectCategory({});
      handleResetUpload();
      navigate("/manage/post");
    } catch (error) {
      console.log(error);
      toast.error("Update post unsuccessfully!");
    }
  };
  if (!postId) return null;
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
          className="mx-auto w-[250px] h-12 lg:h-[60px] mt-10"
          kind="secondary"
          isLoading={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
