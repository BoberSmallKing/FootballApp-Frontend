import { React, useState, useEffect } from "react";
import AxiosInstance from "../../Axios";
import { Box, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextForm from "../forms/TextForm";
import SelectForm from "../forms/SelectForm";
import MultiSelectForm from "../forms/MultiSelectForm";
import DescriptionForm from "../forms/DescriptionForm";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import MyMessage from "../forms/Message";
import { useNavigate } from "react-router";

const Create = () => {
  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const GetData = () => {
    AxiosInstance.get(`country/`).then((res) => {
      setCountry(res.data);
    });

    AxiosInstance.get(`league/`).then((res) => {
      setLeague(res.data);
    });

    AxiosInstance.get(`characteristic/`).then((res) => {
      setCharacteristic(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string("Название клуба должно быть текстом")
      .required("Требуется имя клуба"),
    description: yup
      .string("Описание должно быть текстом")
      .required("Требуется описание"),
    attendance: yup
      .number("Посещаемость должна быть числом")
      .required("Требуется посещаемость"),
    characteristic: yup.array().min(1, "Выберите хотя-бы одно из списка"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: null,
      description: "",
      country: "",
      league: "",
      attendance: "",
      city: "",
      characteristic: [],
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.logo) {
        formData.append("logo", values.logo);
      }
      formData.append("country", values.country);
      formData.append("league", values.league);
      formData.append("attendance", values.attendance);
      formData.append("city", values.city);
      formData.append("characteristic", values.characteristic);
      AxiosInstance.post(`footballclub/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        setMessage(
          <MyMessage
            messageText={"Вы успешно отправили данные в базу данных!"}
            messagecolor={"green"}
          />
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      });
    },
  });

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle2"
          >
            Создать новый клуб!
          </Typography>
        </Box>

        {message}

        <Box className={"FormBox"}>
          <Box className={"FormArea"}>
            <TextForm
              label={"Название клуба"}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <Box sx={{ marginTop: "30px" }}>
              <TextForm
                label={"Город"}
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <SelectForm
                label={"Лига"}
                options={league}
                name="league"
                value={formik.values.league}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.league && Boolean(formik.errors.league)}
                helperText={formik.touched.league && formik.errors.league}
              />
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <Button type="submit" variant="contained" fullWidth>
                Submit the data
              </Button>
            </Box>
          </Box>

          <Box className={"FormArea"}>
            <SelectForm
              label={"Страна"}
              options={country}
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />

            <Box sx={{ marginTop: "30px" }}>
              <TextForm
                label={"Посещаемость"}
                name="attendance"
                value={formik.values.attendance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.attendance && Boolean(formik.errors.attendance)
                }
                helperText={
                  formik.touched.attendance && formik.errors.attendance
                }
              />
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <MultiSelectForm
                label={"Характеристики"}
                options={characteristic}
                name="characteristic"
                value={formik.values.characteristic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.characteristic &&
                  Boolean(formik.errors.characteristic)
                }
                helperText={
                  formik.touched.characteristic && formik.errors.characteristic
                }
              />
            </Box>
          </Box>

          <Box className={"FormArea"}>
            <DescriptionForm
              label={"Описание"}
              rows={9}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              }}
            />
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Create;
