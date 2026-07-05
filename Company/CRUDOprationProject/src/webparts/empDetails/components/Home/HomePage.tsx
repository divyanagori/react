import * as React from "react";
import {
  CommandBarButton,
  PrimaryButton,
  IconButton,
} from "@fluentui/react/lib/Button";

import {
  IIconProps,
  IStackTokens,
  Panel,
  Stack,
  TextField,
} from "@fluentui/react";

import { useBoolean } from "@fluentui/react-hooks";
import { SPHttpClient } from "@microsoft/sp-http";

interface IEmployee {
  Id: number;
  Title: string;
  Name?: string;
  JobTitle?: string;
  Joindate?: string;
  About?: string;

  Author?: {
    Id: number;
    Title: string;
    EMail: string;
  };

  Editor?: {
    Id: number;
    Title: string;
    EMail: string;
  };
}

const HomePage = (props: any) => {
  // PANEL
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  // FORM
  const [editId, setEditId] = React.useState<number | null>(null);
  const [name, setName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [joinedDate, setJoinedDate] = React.useState("");
  const [about, setAbout] = React.useState("");

  // DATA
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);
  const [nextLink, setNextLink] = React.useState<string | null>(null);

  const stackTokens: IStackTokens = { childrenGap: 20 };

  const addIcon: IIconProps = { iconName: "Add" };
  const editIcon: IIconProps = { iconName: "Edit" };
  const deleteIcon: IIconProps = { iconName: "Delete" };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setJobTitle("");
    setJoinedDate("");
    setAbout("");
  };

  // ================= GET DATA (PAGINATION SUPPORT) =================
  const getData = async (url?: string) => {
    try {
      const apiUrl =
        url ||
        `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('EMPDataList')/items?$select=Id,Title,Name,JobTitle,Joindate,Author/Id,Author/Title,Author/EMail,Editor/Id,Editor/Title,Editor/EMail&$expand=Author,Editor&$orderby=Id desc&$top=8`;

      const response = await props.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
          },
        }
      );

      const data = await response.json();

      // first load OR append (pagination)
      setEmployees((prev) =>
        url ? [...prev, ...(data.value || [])] : data.value || []
      );

      setNextLink(data["@odata.nextLink"] || null);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  // ================= LOAD MORE =================
  const loadMore = () => {
    if (nextLink) {
      getData(nextLink);
    }
  };

  // ================= SAVE (POST / MERGE) =================
  const saveData = async () => {
    const body = JSON.stringify({
      Title: name,
      Name: name,
      JobTitle: jobTitle,
      Joindate: joinedDate,
      About: about,
    });

    const isEdit = editId !== null;

    const url = isEdit
      ? `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('EMPDataList')/items(${editId})`
      : `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('EMPDataList')/items`;

    const headers: any = {
      Accept: "application/json;odata=nometadata",
      "Content-type": "application/json;odata=nometadata",
    };

    if (isEdit) {
      headers["X-HTTP-Method"] = "MERGE";
      headers["IF-MATCH"] = "*";
    }

    try {
      const response = await props.context.spHttpClient.post(
        url,
        SPHttpClient.configurations.v1,
        {
          headers,
          body,
        }
      );

      if (response.ok) {
        alert(isEdit ? "Updated" : "Created");
        getData();
        resetForm();
        dismissPanel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE =================
  const deleteData = async (id: number) => {
    try {
      await props.context.spHttpClient.post(
        `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('EMPDataList')/items(${id})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "X-HTTP-Method": "DELETE",
            "IF-MATCH": "*",
          },
        }
      );

      alert("Deleted");
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= EDIT =================
  const handleEditClick = (item: IEmployee) => {
    setEditId(item.Id);
    setName(item.Name || "");
    setJobTitle(item.JobTitle || "");
    setJoinedDate(item.Joindate || "");
    setAbout(item.About || "");
    openPanel();
  };

  // ================= UI =================
  return (
    <div style={{ padding: 20 }}>
       <h1>Employee Details</h1>
       <hr style={{fontSize: 20}} ></hr>
      <CommandBarButton
        iconProps={addIcon}
        text="Add Employee"
        onClick={() => {
          resetForm();
          openPanel();
        }}  
      />

      {/* PANEL */}
      <Panel
        headerText={editId ? "Edit" : "Add"}
        isOpen={isOpen}
        onDismiss={dismissPanel}
      >
        <Stack tokens={stackTokens}>
          <TextField label="Name" value={name} onChange={(_, v) => setName(v || "")} />
          <TextField label="Job Title" value={jobTitle} onChange={(_, v) => setJobTitle(v || "")} />
          <TextField label="Join Date" value={joinedDate} onChange={(_, v) => setJoinedDate(v || "")} />
          <TextField label="About" multiline rows={3} value={about} onChange={(_, v) => setAbout(v || "")} />

          <PrimaryButton text={editId ? "Update" : "Save"} onClick={saveData} />
        </Stack>
      </Panel>

      {/* LIST */}
      {employees.map((item) => (
        <div key={item.Id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
          <b>{item.Name}</b>

          <div>Author: {item.Author?.Title}</div>
          <div>Editor: {item.Editor?.Title}</div>

          <IconButton iconProps={editIcon} onClick={() => handleEditClick(item)} />
          <IconButton iconProps={deleteIcon} onClick={() => deleteData(item.Id)} />
        </div>
      ))}

      {/* LOAD MORE */}
      {nextLink && (
        <PrimaryButton text="Load More" onClick={loadMore} />
      )}
    </div>
  );
};

export default HomePage;