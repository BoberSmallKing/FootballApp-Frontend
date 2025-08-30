import AxiosInstance from "../../Axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Typography, Box, Chip } from "@mui/material";

const FootballclubDetail = () => {
  const [footballclub, setFootballclub] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    AxiosInstance.get(`footballclub/${id}/`).then((res) => {
      setFootballclub(res.data);
    });
  }, [id]);

  if (!footballclub) {
    return <Typography sx={{ mt: 2 }}>Загрузка...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", mt: 4, p: 2 }}>
      {/* Заголовок и эмблема */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        {footballclub.logo && (
          <img
            src={`http://localhost:7000${footballclub.logo}`}
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        )}
        <Box>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {footballclub.name}
          </Typography>
          {footballclub.founded && (
            <Typography variant="subtitle1" color="text.secondary">
              Основан: {footballclub.founded}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Описание */}
      {footballclub.description && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          {footballclub.description}
        </Typography>
      )}

      {/* Основная информация */}
      <Typography variant="subtitle1">
        Страна: {footballclub.country_details?.name}
      </Typography>
      <Typography variant="subtitle1">
        Лига: {footballclub.league_details?.name}
      </Typography>
      <Typography variant="subtitle1">Город: {footballclub.city}</Typography>
      <Typography variant="subtitle1">
        Посещаемость: {footballclub.attendance}
      </Typography>

      {/* Характеристики */}
      {footballclub.characteristics_names?.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          {footballclub.characteristics_names.map((char, i) => (
            <Chip key={i} label={char} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FootballclubDetail;
