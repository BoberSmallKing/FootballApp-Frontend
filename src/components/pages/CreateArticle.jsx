import { useFormik } from "formik";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import MyMessage from "../forms/Message";
import DescriptionForm from "../forms/DescriptionForm";
import CreateIcon from "@mui/icons-material/Create";
import TextForm from "../forms/TextForm";
import AxiosInstance from "../../Axios";
import { useNavigate } from "react-router";

const CreateArticle = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup
      .string("Заголовок должен быть текстом")
      .required("Требуется заголовок"),
    body: yup
      .string("Описание должно быть текстом")
      .required("Требуется описание"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: null,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      if (values.image) {
        formData.append("image", values.image);
      }

      AxiosInstance.post(`blog/article/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          setMessage(
            <MyMessage
              messageText={"Вы успешно отправили данные в базу данных!"}
              messagecolor={"green"}
            />
          );
          setTimeout(() => {
            navigate("/articles");
          }, 1500);
        })
        .catch((error) => {
          setMessage(
            <MyMessage
              messageText={"Ошибка при отправке: " + error.message}
              messagecolor={"red"}
            />
          );
        });
    },
  });

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <CreateIcon />
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle2"
          >
            Создать новый статью!
          </Typography>
        </Box>
        {message}
        <Box className={"FormBox"}>
          <Box className={"FormArea"}>
            <Box sx={{ marginBottom: "15px" }}>
              <TextForm
                label={"Заголовок"}
                rows={9}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <DescriptionForm
                label={"Тело"}
                rows={9}
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
              />
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Создать статью
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateArticle;
