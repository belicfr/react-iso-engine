import './App.css'
import {GameView} from "./game/GameView.tsx";
import {UserProvider} from "./io/users/UserContext.tsx";
import {RoomsProvider} from "./io/rooms/RoomsContext.tsx";
import {AlertsProvider, useAlerts} from "./game/gui/windows/AlertsContext.tsx";
import {StaffAlert} from "./game/gui/windows/prefabs/modals/staff-alert/StaffAlert.tsx";
import {RoomTemplatesProvider} from "./io/rooms/RoomTemplatesContext.tsx";

const Alerts = () => {
  const {alerts, removeAlert} = useAlerts();

  return (
    <>
      {alerts.map((alert, i) =>
        <StaffAlert
          key={i}
          alert={alert}
          onClose={() => removeAlert(alert.id)}
        />)}
    </>
  );
};

export default function App() {
  return (
    <>
      <UserProvider>
        <RoomsProvider>
          <RoomTemplatesProvider>
            <AlertsProvider>

              <Alerts />

              <GameView />




            </AlertsProvider>
          </RoomTemplatesProvider>
        </RoomsProvider>
      </UserProvider>
    </>
  )
}