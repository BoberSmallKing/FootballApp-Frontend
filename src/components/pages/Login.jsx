import React from "react";
import { useFormik } from "formik";
import AxiosInstance from "../../Axios";
import TextForm from "../forms/TextForm";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    username: yup.string().required("Требуется имя пользователя"),
    password: yup.string().required("Требуется пароль"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await AxiosInstance.post("/blog/token/", {
          username: values.username,
          password: values.password,
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
        const errorMsg = "Неверное имя пользователя или пароль";
        setFieldError("username", errorMsg);
        setFieldError("password", errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box className={"FormBox"}>
      <Box className={"FormArea"}>
        <form onSubmit={formik.handleSubmit}>
          <h1 className="auth-title">Вход</h1>
          <Box sx={{ marginBottom: "15px" }}>
            <TextForm
              label="Username"
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
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            fullWidth
          >
            {formik.isSubmitting ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
