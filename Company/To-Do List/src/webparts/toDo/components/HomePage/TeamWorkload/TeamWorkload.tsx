import React, { useEffect, useState } from "react";
import "./TeamWorkload.scss";

import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { getItems } from "../getToDOItems";
interface IUserTask {
  key: string;
  user: string;
  assignedTask: number;
  overdueTask: number;
  completedTask: number;
}
const TeamWorkload = ({ context }: any) => {
  const [items, setItems] = useState<IUserTask[]>([]);
  const loadItems = async () => {
    const data = await getItems(context);
    console.log("onload", data);

    const groupedData: any = {};
    data.forEach((items: any) => {
      const user = items.UserName;
      if (!groupedData[user]) {
        groupedData[user] = {
          key: user,
          user: user,
          assignedTask: 0,
          overdueTask: 0,
          completedTask: 0,
        };
      }
      groupedData[user].assignedTask++;
      if (items.ProjectStatus === "Completed") {
        groupedData[user].completedTask++;
      }
      if (items.ProjectStatus === "Overdue") {
        groupedData[user].overdueTask++;
      }

      console.log(items);
    });
    console.log(items);
    const result = Object.keys(groupedData).map((key) => groupedData[key])
    setItems(result);
  };
  useEffect(() => {
    loadItems();
  }, []);
  const columns: IColumn[] = [
    {
      key: "user",
      name: "User",
      fieldName: "user",
      minWidth: 230,
      maxWidth: 350
    },
    {
      key: "assigned",
      name: "Assigned Task",
      fieldName: "assignedTask",
      minWidth: 230,
      maxWidth: 350,
      headerClassName:"userWorkloadStatus",
      onRender: (item) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.assignedTask}
        </div>
      ),
    },
    {
      key: "overdue",
      name: "Overdue Task",
      fieldName: "overdueTask",
      minWidth: 230,
      maxWidth: 350,
      headerClassName:"userWorkloadStatus",
      onRender: (item) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.overdueTask}
        </div>
      ),
    },
    {
      key: "completed",
      name: "Completed Task",
      fieldName: "completedTask",
      minWidth: 230,
      maxWidth: 350,
      headerClassName:"userWorkloadStatus",
      onRender: (item) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.completedTask}
        </div>
      ),
    },
  ];
  return (
    <div className="TeamWorkload">
      <div className="TeamWorkloadBox">
        <DetailsList
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
};

export default TeamWorkload;
