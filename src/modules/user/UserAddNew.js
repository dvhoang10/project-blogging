import DashboardHeading from "modules/Dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFirebaseImage from "hooks/useFirebaseImage";
import ImageUpload from "components/image/ImageUpload";
import FormLayout from "modules/Dashboard/FormLayout";
import Field from "components/field/Field";
import { Label } from "components/label";
import Input from "components/input/Input";
import Button from "components/button/Button";
import { toast } from "react-toastify";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { Radio } from "components/checkbox";
import { userRole, userStatus } from "utils/constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import useToggleValue from "hooks/useToggleValue";
import { IconEyeToogle } from "components/icons";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email format")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please enter your password"),
});
const UserAddNew = () => {
  useEffect(() => {
    document.title = "Create user";
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const navigate = useNavigate();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleAddUser = async (values) => {
    if (!isValid) return;
    try {
      // const avatarUser =
      //   image ||
      //   "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await addDoc(collection(db, "users"), {
        avatar: image,
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        email: values.email,
        password: values.password,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success(`Create user successfully!`);
      reset({
        avatar: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
      navigate("/manage/user");
    } catch (error) {
      console.log(error);
      toast.error("Can not create new user");
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto lg:mb-10 mb-5">
          <ImageUpload
            className="!rounded-full h-full"
            image={image}
            progress={progress}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <FormLayout>
          <Field>
            <Label>Fullname*</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </FormLayout>
        <FormLayout>
          <Field>
            <Label>Email*</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password*</Label>
            <Input
              control={control}
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Create your password"
            >
              <IconEyeToogle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToogle>
            </Input>
          </Field>
        </FormLayout>
        <FormLayout>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default withErrorBoundary(UserAddNew, {
  FallbackComponent: ErrorComponent,
});
