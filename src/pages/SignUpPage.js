import React, { useEffect } from "react";
import { Field } from "components/field";
import IconEyeToggle from "components/icons/IconEyeToogle";
import { Input } from "components/input";
import { Label } from "components/label";
import useToggleValue from "hooks/useToggleValue";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LayoutAuthentication from "layouts/LayoutAuthentication";
import { Checkbox } from "components/checkbox";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constant";
import { auth, db } from "firebase-app/firebase-config";

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
  term: yup.bool().oneOf([true], "The terms and conditions must be accepted"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      terms: false,
    },
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const watchTerms = watch("terms");
  useEffect(() => {
    document.title = "Register";
  }, []);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        username: slugify(values.fullname, { lower: true }),
        email: values.email,
        password: values.password,
        avatar:
          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Register successful!");
      reset({
        fullname: "",
        email: "",
        password: "",
        terms: false,
      });
      navigate("/");
    } catch {
      toast.error("Account already exists!");
    }
  };

  return (
    <LayoutAuthentication>
      <form
        className="max-w-[600px] mx-auto"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="text-sm lg:text-base text-center font-normal mb-[30px] lg:mb-[25px]">
          You already have an account?{" "}
          <Link to="/login" className="font-medium underline text-primary">
            Login
          </Link>
        </div>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            control={control}
            name="fullname"
            type="text"
            placeholder="Enter your fullname"
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Create your password"
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </Field>
        <Checkbox
          name="term"
          checked={watchTerms === true}
          onClick={() => setValue("terms", !watchTerms)}
          className="mb-[30px] lg:mb-[25px]"
        >
          <p className="flex-1 text-xs lg:text-sm">
            <span className="cursor-pointer">I agree to the </span>
            <Link to="/" className="inline-block underline text-primary">
              Term of Use
            </Link>{" "}
            <span className="lg:cursor-pointer">
              and have read and understand the{" "}
            </span>
            <Link to="/" className="inline-block underline text-primary">
              Privacy policy
            </Link>
            .
          </p>
        </Checkbox>
        <Button
          type="submit"
          className="w-full mx-auto max-w-[300px] h-12 lg:h-[60px]"
          kind="primary"
          isLoading={isSubmitting}
        >
          Register
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
