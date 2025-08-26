import { useEffect, useMemo, useState } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router"; // Исправлен импорт
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { MaterialReactTable } from "material-react-table";
import AxiosInstance from "../../Axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [myData, setMyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const GetData = () => {
    const url = id ? `footballclub/?league_id=${id}` : `footballclub/`;
    AxiosInstance.get(url).then((res) => {
      setMyData(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, [id]);

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "country_details.name",
      header: "Страна",
    },
    {
      accessorKey: "league_details.name",
      header: "Лига",
    },
    {
      accessorKey: "city",
      header: "Город",
    },
    {
      accessorKey: "attendance",
      header: "Посещаемость",
    },
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
  ]);

  // Локализация для MaterialReactTable
  const localization = {
    actions: "Действия",
    and: "и",
    cancel: "Отмена",
    changeFilterMode: "Изменить режим фильтра",
    changeSearchMode: "Изменить режим поиска",
    clearFilter: "Очистить фильтр",
    clearSearch: "Очистить поиск",
    clearSort: "Очистить сортировку",
    clickToCopy: "Нажмите, чтобы скопировать",
    collapse: "Свернуть",
    collapseAll: "Свернуть все",
    columnActions: "Действия со столбцами",
    copiedToClipboard: "Скопировано в буфер обмена",
    dropToGroupBy: "Перетащите, чтобы сгруппировать по {column}",
    edit: "Редактировать",
    expand: "Развернуть",
    expandAll: "Развернуть все",
    filterArrIncludes: "Включает",
    filterArrIncludesAll: "Включает все",
    filterArrIncludesSome: "Включает",
    filterBetween: "Между",
    filterBetweenInclusive: "Между включительно",
    filterByColumn: "Фильтровать по {column}",
    filterContains: "Содержит",
    filterEmpty: "Пустой",
    filterEndsWith: "Заканчивается на",
    filterEquals: "Равно",
    filterEqualsString: "Равно",
    filterFuzzy: "Нечеткий",
    filterGreaterThan: "Больше чем",
    filterGreaterThanOrEqualTo: "Больше или равно",
    filterInNumberRange: "Между",
    filterIncludesString: "Содержит",
    filterIncludesStringSensitive: "Содержит",
    filterLessThan: "Меньше чем",
    filterLessThanOrEqualTo: "Меньше или равно",
    filterMode: "Режим фильтра: {filterType}",
    filterNotEmpty: "Не пустой",
    filterNotEquals: "Не равно",
    filterStartsWith: "Начинается с",
    filterWeakEquals: "Равно",
    filteringByColumn: "Фильтрация по {column} - {filterType} {filterValue}",
    goToFirstPage: "Перейти на первую страницу",
    goToLastPage: "Перейти на последнюю страницу",
    goToNextPage: "Перейти на следующую страницу",
    goToPreviousPage: "Перейти на предыдущую страницу",
    grab: "Захватить",
    groupByColumn: "Группировать по {column}",
    groupedBy: "Сгруппировано по ",
    hideAll: "Скрыть все",
    hideColumn: "Скрыть столбец {column}",
    max: "Макс",
    min: "Мин",
    move: "Переместить",
    noRecordsToDisplay: "Нет записей для отображения",
    noResultsFound: "Результатов не найдено",
    of: "из",
    or: "или",
    pin: "Закрепить",
    pinToLeft: "Закрепить слева",
    pinToRight: "Закрепить справа",
    resetColumnSize: "Сбросить размер столбца",
    resetOrder: "Сбросить порядок",
    rowActions: "Действия со строками",
    rowNumber: "#",
    rowNumbers: "Номера строк",
    rowsPerPage: "Строк на странице",
    save: "Сохранить",
    search: "Поиск",
    selectedCountOfRowCountRowsSelected:
      "{selectedCount} из {rowCount} строк выбрано",
    select: "Выбрать",
    showAll: "Показать все",
    showAllColumns: "Показать все столбцы",
    showHideColumns: "Показать/скрыть столбцы",
    showHideFilters: "Показать/скрыть фильтры",
    showHideSearch: "Показать/скрыть поиск",
    sortByColumnAsc: "Сортировать по {column} по возрастанию",
    sortByColumnDesc: "Сортировать по {column} по убыванию",
    sortedByColumnAsc: "Отсортировано по {column} по возрастанию",
    sortedByColumnDesc: "Отсортировано по {column} по убыванию",
    thenBy: ", затем по ",
    toggleDensity: "Переключить плотность",
    toggleFullScreen: "Переключить полноэкранный режим",
    toggleSelectAll: "Переключить выбор всех",
    toggleSelectRow: "Переключить выбор строки",
    unpin: "Открепить",
    unpinAll: "Открепить все",
  };

  return (
    <div>
      <Box className={"TopBar"}>
        <CalendarViewMonthIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Посмотреть все клубы!
        </Typography>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={myData}
        enableRowActions
        localization={localization} // Добавляем локализацию
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/footballclub/${row.original.id}`),
          style: { cursor: "pointer" },
        })}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
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
        )}
      />
    </div>
  );
};

export default Home;
