"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}
interface DataGridDemoProps {
  rows: User[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const DataGridDemo: React.FC<DataGridDemoProps> = ({
  rows,
  handleEdit,
  handleDelete,
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 250,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="edit" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "90%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default DataGridDemo;
