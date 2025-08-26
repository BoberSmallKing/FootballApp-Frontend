import React from "react";
import { useFormik } from "formik";
import AxiosInstance from "../../Axios";
import TextForm from "../forms/TextForm";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Требуется имя пользователя")
      .min(3, "Имя пользователя должно быть не менее 3 символов"),
    password: yup
      .string()
      .required("Требуется пароль")
      .min(6, "Пароль должен быть не менее 6 символов"),
    password2: yup
      .string()
      .required("Требуется подтверждение пароля")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await AxiosInstance.post("/blog/register/", {
          username: values.username,
          password: values.password,
          password2: values.password2,
        });

        const { access, refresh } = response.data;

        localStorage.clear();
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access}`;

        navigate("/");
      } catch (error) {
        if (error.response?.data) {
          const errors = error.response.data;
          if (errors.username) {
            setFieldError("username", errors.username[0]);
          }
          if (errors.password) {
            setFieldError("password", errors.password[0]);
          }
          if (errors.non_field_errors) {
            setFieldError("username", errors.non_field_errors[0]);
            setFieldError("password", errors.non_field_errors[0]);
          }
        } else {
          setFieldError("username", "Ошибка регистрации");
          setFieldError("password", "Ошибка регистрации");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box className={"FormBox"}>
      <Box className={"FormArea"}>
        <form onSubmit={formik.handleSubmit}>
          <h1 className="auth-title">Регистрация</h1>

          <Box sx={{ marginBottom: "15px" }}>
            <TextForm
              label="Имя"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>

          <Box sx={{ marginBottom: "15px" }}>
            <TextForm
              label="Пароль"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box sx={{ marginBottom: "15px" }}>
            <TextForm
              label="Подтвердите пароль"
              name="password2"
              type="password"
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.touched.password2 && formik.errors.password2}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
