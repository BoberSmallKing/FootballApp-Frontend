import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AxiosInstance from "../../Axios";
import "../../ArticleDetails.css";

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    AxiosInstance.get(`blog/article/${id}`).then((res) => {
      setArticle(res.data);
    });
  }, [id]);

  if (!article) return <div>Загрузка...</div>;

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        <span style={{ marginRight: "10px" }}>{article.author.username}</span>
        <span>
          {new Date(article.created_at).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <img
        className="article-image"
        src={`http://localhost:7000${article.image}`}
        alt={article.title}
      />
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </div>
  );
};

export default ArticleDetail;
