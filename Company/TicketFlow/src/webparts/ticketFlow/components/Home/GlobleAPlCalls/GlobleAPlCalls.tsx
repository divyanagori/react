import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export const getTicketItems = async (context: any) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('NewTicket')/items`;

  try {
    const response: SPHttpClientResponse = await context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=nometadata",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    const result = data.value.map((item: any) => ({
      ID: item.ID,
      teams: item.Team,
      ticketId: item.TicketID,
      title: item.Title,
      status: item.Status,
      priority: item.PriorityType,
      service: item.Service,
      requestType: item.RequestType,
      requester: item.Requester,
      requesterEmail: item.RequesterEmail,
      assignedTo: item.AssignedTo,
      assignedToEmail: item.AssignedToEmail,
      description: item.TicketDesc,
    }));

    return result;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const updateItem = async (
  context: any,
  itemId: number,
  updatedData: any
) => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('NewTicket')/items(${itemId})`;

  const response = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json;odata=nometadata",
        "Content-Type": "application/json;odata=nometadata",
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error(`Error updating item: ${response.statusText}`);
  }

  return true;
};