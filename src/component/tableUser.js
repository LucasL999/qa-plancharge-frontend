import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import {getAllUsers} from "../services/userService";

export default function TableUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await getAllUsers();
                setUsers(res);
            } catch (error) {
                console.error(error);
                }
            };
        fetchAllUsers();
    }, []);
  return (
    
<TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650, borderRadius: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Utilisateur</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Email</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }} >Rôle</TableCell>
            <TableCell align="center" ></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ ":hover": {backgroundColor: alpha("#5DA1BC", 0.2), cursor: "pointer"} }}>
              <TableCell align="center" sx={{ color: "#0178A5", fontWeight: "bold" }}>{user.name} {user.firstname}</TableCell>
              <TableCell align="center" sx={{color: "#009951", fontWeight: "bold"}}>{user.email}</TableCell>
              <TableCell align="center" sx={{color: "#6B6B6B", fontWeight: "bold"}}>{user.libelle}</TableCell>
              <TableCell align="center" sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 3,}}>
                    <Tooltip title="Modifier">
                    <EditIcon sx={{ color: "#003CFF" }} />
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <DeleteIcon sx={{ color: "#ff0000" }} />
                    </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
