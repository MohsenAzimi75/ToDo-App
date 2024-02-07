import { Container, Typography } from "@mui/material";
import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import { getTodos } from "@/api";
export default async function Home() {
  const tasks = await getTodos();
  console.log(tasks);

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        style={{ fontFamily: "satisfies", fontWeight: "bold" }}
      >
        TODO Application
      </Typography>
      <AddItem />
      <TodoList tasks={tasks} />
    </Container>
  );
}
