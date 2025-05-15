import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

export default function createConnection(): HubConnection {
  const connection: HubConnection = new HubConnectionBuilder()
    .withUrl(
      "http://localhost:5226/ws/game",
      {
        skipNegotiation: false,
        transport: HttpTransportType.WebSockets,
      }
    )
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.onclose(err => console.error("SignalR Disconnected", err));

  return connection;
}