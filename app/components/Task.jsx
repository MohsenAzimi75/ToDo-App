"use client";
import {
  TextField,
  Container,
  Button,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { MdOutlineEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import ModalForm from "./ModalForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

function Task({ task }) {
  const router = useRouter();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.title);
  const [open, setOpen] = useState(false);

  const handleSubmitEditTodo = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });

    setModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id) => {
    await deleteTodo(id);
    setModalDelete(false);
    router.refresh();
  };

  return (
    <>
      <TableRow>
        <TableCell>{task.title}</TableCell>
        <TableCell>
          <MdOutlineEdit
            size={20}
            cursor="Pointer"
            onClick={() => setModalEdit(true)}
          />
          <ModalForm open={modalEdit} setOpen={setModalEdit}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Edit Items
            </Typography>
            <form onSubmit={handleSubmitEditTodo}>
              <Container>
                <TextField
                  id="1"
                  label="Title"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  fullWidth
                  style={{ margin: 10 }}
                />
                <TextField
                  id="2"
                  label="Description"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  fullWidth
                  style={{ margin: 10 }}
                />
                <TextField
                  id="3"
                  label="Color"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  fullWidth
                  style={{ margin: 10 }}
                />
              </Container>

              <Container style={{ display: "flex", justifyContent: "right" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginLeft: 16 }}
                >
                  Save
                </Button>
              </Container>
            </form>
          </ModalForm>
          <BsFillTrashFill
            onClick={() => setModalDelete(true)}
            cursor="Pointer"
            size={20}
          />
          <ModalForm open={modalDelete} setOpen={setModalDelete}>
            <Container style={{ padding: 25, margin: 15 }}>
              <Typography>Are You Sure?</Typography>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                style={{ marginTop: 15 }}
                variant="contained"
              >
                Yes
              </Button>
            </Container>
          </ModalForm>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Task;
