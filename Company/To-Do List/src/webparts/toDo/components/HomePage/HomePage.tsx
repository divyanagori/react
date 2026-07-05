import React from "react";
import Navbar from "./Navbar/Navbar";
import "./HomePage.scss";
import StatusPannel from "./StatusPannel/StatusPannel";
import TaskPannel from "./TaskPannel/TaskPannel";
import { IToDoProps } from "../IToDoProps";

const HomePage = ({ context }: IToDoProps) => {
  const [todoData, setTodoData] = React.useState<any[]>([]);
  return (
    <div className="homePage">
      <Navbar context={context} todoData={todoData} setTodoData={setTodoData} />
     
    </div>
  );
};

export default HomePage;
