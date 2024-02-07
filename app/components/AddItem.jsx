"use client";
import { Container, Button } from "@mui/material";
import { TextField, Typography } from "@material-ui/core";
import ModalForm from "./ModalForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function AddItem() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
  });

  const { register } = useForm({ resolver: yupResolver(schema) });

  const handleOnSubmitForm = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTask,
    });
    setNewTask("");
    setOpen(false);
    router.refresh();
  };

  return (
    <Container align="center">
      <Button variant="contained" onClick={() => setOpen(true)}>
        ADD
      </Button>
      <ModalForm open={open} setOpen={setOpen}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Add Your Items
        </Typography>
        <form onSubmit={handleOnSubmitForm}>
          <Container>
            <TextField
              id="1"
              label="Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
              style={{ margin: 10 }}
              {...register("title")}
            />
            <TextField
              id="2"
              label="Description"
              fullWidth
              style={{ margin: 10 }}
              {...register("description")}
            />
            <TextField
              id="3"
              label="Color"
              fullWidth
              style={{ margin: 10 }}
              {...register("color")}
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
    </Container>
  );
}

export default AddItem;
