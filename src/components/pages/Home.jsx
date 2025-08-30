import { useEffect, useMemo, useState } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { MaterialReactTable } from "material-react-table";
import AxiosInstance from "../../Axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [myData, setMyData] = useState([]);
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const GetData = () => {
    const url = id ? `footballclub/?league_id=${id}` : `footballclub/`;
    AxiosInstance.get(url).then((res) => setMyData(res.data));
  };

  useEffect(() => {
    const isStaff = localStorage.getItem("is_staff") === "true";
    setIsAdmin(isStaff);
    GetData();
  }, [id]);

  // Колонки таблицы
  const columns = useMemo(() => {
    const baseColumns = [
      { accessorKey: "name", header: "Имя" },
      { accessorKey: "country_details.name", header: "Страна" },
      { accessorKey: "league_details.name", header: "Лига" },
      { accessorKey: "city", header: "Город" },
      { accessorKey: "attendance", header: "Посещаемость" },
      {
        accessorKey: "characteristics_names",
        header: "Характеристики",
        Cell: ({ cell }) => (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {cell.getValue()?.map((char, index) => (
              <Chip key={index} label={char} />
            ))}
          </div>
        ),
      },
    ];

    // Добавляем колонку действий только если админ
    if (isAdmin) {
      baseColumns.push({
        id: "actions",
        header: "Действия",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconButton
              color="primary"
              component={Link}
              to={`edit/${row.original.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              component={Link}
              to={`delete/${row.original.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      });
    }

    return baseColumns;
  }, [isAdmin]);

  return (
    <div>
      <Box className={"TopBar"}>
        <CalendarViewMonthIcon />
        <Typography sx={{ ml: 2, fontWeight: "bold" }} variant="subtitle2">
          Посмотреть все клубы!
        </Typography>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={myData}
        enableRowActions={false} // rowActions полностью выключены
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/footballclub/${row.original.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default Home;
