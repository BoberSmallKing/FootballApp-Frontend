import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

const truncateText = (text, maxLength = 70) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default function ArticleCard({ options }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea component={Link} to={`${options.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:7000${options.image}`}
          alt={options.title || "Изображение статьи"}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              maxHeight: "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {options.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "14px",
              maxHeight: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {truncateText(options.body, 150)}{" "}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
