  import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";


  export const getItems = async (context: any) => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items`;

    const response = await context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1
    );

    const data = await response.json();

    return data.value.map((item: any) => ({
      ...item,
      todo: item.todo ? JSON.parse(item.todo) : []
    }));
  };


// ================Getting Data from ToDoProjectItems===================

  export const getProjectItems = async (context: any) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoProjectOptions')/items`;

  try {
    const response = await context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
      {
      headers: {
        Accept: "application/json;odata=nometadata",
      },
    }
    );

   if(response.ok){
    const data = await response.json();
    console.log("getProject",data.value);
    return data.value
   }
  } catch (error) {
    console.log("Error:", error);
  }
};


// ================Getting Data from ToDoUserItems==================

export const getUserItems = async (context: any) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDoUserOptions')/items`;

  try {
    const response = await context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
      {
      headers: {
        Accept: "application/json;odata=nometadata",
      },
    }
    );

   if(response.ok){
    const data = await response.json();
    console.log("get",data.value);
    return(data.value);
   }
  } catch (error) {
    console.log("Error:", error);
  }
};