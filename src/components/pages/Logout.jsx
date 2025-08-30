import { useEffect } from "react";
import { useNavigate } from "react-router";
import AxiosInstance from "../../Axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const accessToken = localStorage.getItem("access_token");

        if (refreshToken) {
          if (accessToken) {
            AxiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
          }

          await AxiosInstance.post("/blog/logout/", {
            refresh_token: refreshToken,
          });
        }
      } catch (e) {
      } finally {
        // Всегда очищаем локальные данные
        localStorage.clear();
        AxiosInstance.defaults.headers.common["Authorization"] = null;
        navigate("/register");
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Выход из системы...</div>;
};

export default Logout;
