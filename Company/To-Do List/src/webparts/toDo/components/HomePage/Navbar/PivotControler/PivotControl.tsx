import {
  DefaultButton,
  DetailsList,
  IColumn,
  IconButton,
  ILabelStyles,
  IStyleSet,
  Label,
  Panel,
  Pivot,
  PivotItem,
  PrimaryButton,
  SelectionMode,
  TextField,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useBoolean } from "@fluentui/react-hooks";
import "./PivotControl.scss";
import { SPHttpClient } from "@microsoft/sp-http";
import { getProjectItems, getUserItems } from "../../getToDOItems";

const PivotControl = ({ context, setTodoData }: any) => {
  // ===============Entries================
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  // ===========Opening Pannel=======
  const [
    isOpenProject,
    { setTrue: openProjectPanel, setFalse: dismissProjectPanel },
  ] = useBoolean(false);
  const [isOpenUser, { setTrue: openUserPanel, setFalse: dismissUserPanel }] =
    useBoolean(false);

  const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
  };

  //  ==========Button================
  interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
  }

  // ================Posting Project Data======================
  const addProjectItem = async () => {
    if (!projectName.trim() || !projectCode.trim()) {
      alert("Enter Complete Data");
      return;
    }

    const existingProjects = await getProjectItems(context);

    const duplicateProject = existingProjects.some(
      (item: any) =>
        item.ProjectName?.trim().toLowerCase() ===
        projectName.trim().toLowerCase(),
    );

    if (duplicateProject) {
      alert("Project already exists");
      return;
    }
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoProjectOptions')/items`;

    const response = await context.spHttpClient.post(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-Type": "application/json;odata=nometadata",
          "odata-version": "",
        },
        body: JSON.stringify({
          ProjectName: projectName,
          ProjectCode: projectCode,
        }),
      },
    );

    if (response.ok) {
      const item = await response.json();
      alert("Item added");
      setProjectCode("");
      setProjectName("");
      dismissProjectPanel();
    } else {
      alert("Failed to add item");
    }
  };

  // ========================Post User Data=======================


  const addUserItem = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      alert("Enter Complete Data");
      return;
    }
    const existingUser = await getUserItems(context);
    const duplicateUser = existingUser.some(
      (item: any) =>
        item.UserEmail?.trim().toLowerCase() === userEmail.trim().toLowerCase(),
    );
    if (duplicateUser) {
      alert("Email already exists");
      return;
    }
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoUserOptions')/items`;

    const response = await context.spHttpClient.post(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-Type": "application/json;odata=nometadata",
          "odata-version": "",
        },
        body: JSON.stringify({
          UserName: userName,
          UserEmail: userEmail,
        }),
      },
    );

    if (response.ok) {
      const item = await response.json();
      alert("Item added");
      onPageLoad();
      setUserName("");
      setUserEmail("");
      dismissUserPanel();
    } else {
      alert("Failed to add item");
    }
  };

  const ClearItems = () => {
    setUserName("");
    setUserEmail("");
    setProjectCode("");
    setProjectName("");
  };

  //  ======================DetailsList Content========================
  const [projectItems, setProjectItems] = useState<any>([]);

  const onPageLoad = async () => {
    const data = await getProjectItems(context);

    const projectData = data.map((item: any) => ({
      key: item.Id,
      ProjectName: item.ProjectName,
      ProjectCode: item.ProjectCode,
    }));

    setProjectItems(projectData);
  };

  useEffect(() => {
    onPageLoad();
  }, []);

  // ============ delete Project Data=========
  const handleDelete = async (id: number) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoProjectOptions')/items(${id})`;

  const response = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json;odata=nometadata",
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      },
    }
  );

  if (response.ok) {
    alert("Item deleted successfully");
    onPageLoad(); // Refresh the DetailsList
  } else {
    alert("Failed to delete item");
  }
};

  const columns: IColumn[] = [
    {
      key: "projectName",
      name: "Project Name",
      fieldName: "ProjectName",
      minWidth: 250,
      maxWidth: 400,
      isResizable: true,
    },
    {
      key: "projectCode",
      name: "Project Code",
      fieldName: "ProjectCode",
      minWidth: 250,
      maxWidth: 400,
      isResizable: true,
    },
    {
      key: "actions",
      name: "Action",
      minWidth: 100,
      maxWidth: 120,
      headerClassName: "actionsHeader",
      onRender: (item: any) => (
        <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
          {/* <IconButton
            iconProps={{ iconName: "Edit" }}
            title="Edit"
            // onClick={() => handleEdit(item)}
          /> */}

          <IconButton
            iconProps={{ iconName: "Delete" }}
            title="Delete"
             onClick={() => handleDelete(item.key)}
          />
        </div>
      ),
    },
  ];


  // ==========User DetailList ============================


  // ===========Deleting User Data==========

  const handleDeleteUser = async (id: number) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoUserOptions')/items(${id})`;

  const response = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json;odata=nometadata",
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      },
    }
  );

  if (response.ok) {
    alert("Item deleted successfully");
    onPageLoadOfUser();
  } else {
    alert("Failed to delete item");
  }
};

  const [userItems, setUserItems] = useState<any[]>([]);
const onPageLoadOfUser = async () => {
    const data = await getUserItems(context);

    const userData = data.map((item: any) => ({
      key: item.Id,
      UserName: item.UserName,
      UserEmail: item.UserEmail,
    }));

    setUserItems(userData);
  };

  useEffect(() => {
    onPageLoadOfUser();
  }, []);


  const userColumns: IColumn[] = [
  {
    key: "userName",
    name: "User Name",
    fieldName: "UserName",
    minWidth: 200,
    maxWidth: 300,
    isResizable: true,
  },
  {
    key: "userEmail",
    name: "User Email",
    fieldName: "UserEmail",
    minWidth: 250,
    maxWidth: 350,
    isResizable: true,
  },
  {
    key: "actions",
    name: "Action",
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: any) => (
      <div style={{ display: "flex", gap: "10px" }}>
        {/* <IconButton
          iconProps={{ iconName: "Edit" }}
          title="Edit"
         /// onClick={() => handleEditUser(item)}
        /> */}

        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Delete"
          onClick={() => handleDeleteUser(item.key)}
        />
      </div>
    ),
  },
];

  return (
    <div>
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem headerText="Project">
          <Label styles={labelStyles}></Label>
          <div>
            <DefaultButton text="Add Project" onClick={openProjectPanel} />
          </div>
          <DetailsList
            items={projectItems}
            columns={columns}
            selectionMode={SelectionMode.none}
          />
        </PivotItem>
        <PivotItem headerText="User">
          <Label styles={labelStyles}></Label>
          <DefaultButton text="Add User" onClick={openUserPanel} />
          <DetailsList
            items={userItems}
            columns={userColumns}
            selectionMode={SelectionMode.none}
          />
        </PivotItem>
      </Pivot>
      <Panel
        headerText="Project"
        isOpen={isOpenProject}
        onDismiss={dismissProjectPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <div>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(_, value: any) => {
              setProjectName(value);
            }}
          />
          <TextField
            label="Project Code"
            value={projectCode}
            onChange={(_, value: any) => {
              setProjectCode(value);
            }}
          />
          <div className="saveCancelButton">
            <DefaultButton
              text="Cancel"
              onClick={ClearItems}
              allowDisabledFocus
              // disabled={disabled}
              // checked={checked}
            />
            <PrimaryButton
              text="Save"
              onClick={addProjectItem}
              allowDisabledFocus
            />
          </div>
        </div>
      </Panel>
      <Panel
        headerText="User"
        isOpen={isOpenUser}
        onDismiss={dismissUserPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <div>
          <TextField
            label="User Name"
            value={userName}
            onChange={(_, value: any) => {
              setUserName(value);
            }}
          />
          <TextField
            label="User Email"
            value={userEmail}
            onChange={(_, value: any) => {
              setUserEmail(value);
            }}
          />
          <div className="saveCancelButton">
            <DefaultButton
              text="Cancel"
              onClick={ClearItems}
              allowDisabledFocus
              // disabled={disabled}
              // checked={checked}
            />
            <PrimaryButton
              text="Save"
              onClick={addUserItem}
              allowDisabledFocus
              // disabled={disabled}
              // checked={checked}
            />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default PivotControl;
