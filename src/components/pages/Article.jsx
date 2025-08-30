import { React, useState, useEffect } from "react";
import AxiosInstance from "../../Axios";
import ArticleCard from "../ArticleCard";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const Article = () => {
  const [articles, setArticles] = useState([]);

  const GetData = () => {
    AxiosInstance.get(`blog/article/`).then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <Box className={"TopBar"}>
        <ArticleIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Посмотреть все статьи!
        </Typography>
      </Box>
      <Box className={"FormBox"}>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "15px", marginLeft: "15px" }}
        >
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <ArticleCard options={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Article;
