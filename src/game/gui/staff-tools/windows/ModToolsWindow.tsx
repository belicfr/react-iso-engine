import {FC} from "react";
import {Window} from "../../windows/Window.tsx";
import {Button} from "../../buttons/Button.tsx";
import "./ModToolsWindow.css";

type Props = {
  onClose: () => void,
};

type Action = {
  label: string,
  onClick: () => void,
  disabled?: boolean,
}

export const ModToolsWindow: FC<Props> = props => {
  const actions: Action[] = [
    {label: "Room Tools", onClick: () => {}},
    {label: "Room Chatlogs", onClick: () => {}},
    {label: "User Info:", onClick: () => {}, disabled: true},
    {label: "Tickets Browser", onClick: () => {}},
  ];

  return (
    <>
      <Window
        title="MOD Tools"
        width="200px"
        height="213px"
        onClose={props.onClose}
      >

        <div className="mod-tools__actions">
          {actions.map((action, index) =>
              <Button key={index} color="light" disabled={action.disabled}>
                {action.label}
              </Button>)}
        </div>
      </Window>
    </>
  );
};