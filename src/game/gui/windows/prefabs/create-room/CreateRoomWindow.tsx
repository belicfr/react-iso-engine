import {FC, useEffect, useState} from "react";
import {Window} from "../../Window.tsx";
import "./CreateRoomWindow.css";
import {RoomInformationStep} from "./steps/RoomInformationStep.tsx";
import {RoomModelSelectionStep} from "./steps/RoomModelSelectionStep.tsx";
import {Action, RoomAction} from "../../../../../frameworks/types/Actions.ts";
import {useConnection} from "../../../../../io/ConnectionContext.tsx";
import {PublicRoomTemplateDto} from "../../../../../models/dto/public/PublicRoomTemplateDto.ts";
import {RoomCreationModel} from "../../../../../io/rooms/RoomCreationModel.ts";
import {Handler, HandlerResponseCode} from "../../../../../io/HandlerResponse.ts";
import Room from "../../../../../models/Room.ts";
import {PublicRoomDto} from "../../../../../models/dto/public/PublicRoomDto.ts";
import {useAlerts} from "../../AlertsContext.tsx";

type Props = {
  onRoomCreate: RoomAction,
  onClose: Action,
};

export const CreateRoomWindow: FC<Props> = ({onRoomCreate, onClose}) => {
  const [model, setModel] = useState<PublicRoomTemplateDto|null>(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [firstTag, setFirstTag] = useState<string>("");
  const [secondTag, setSecondTag] = useState<string>("");

  const [currentStep, setCurrentStep] = useState<Step>(Step.ROOM_MODEL_SELECTION);

  const connection = useConnection();

  const { addAlert } = useAlerts();

  function createRoom() {
    if (!model) return;

    const creationModel: RoomCreationModel = {
      name,
      description,
      tagOne: firstTag,
      tagTwo: secondTag,
      templateId: model.id,
    };

    connection.invoke("SendCreateRoom", creationModel);
  }

  useEffect(() => {
    const handlerCreateRoom: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        const room: PublicRoomDto = response.props[0];

        onRoomCreate(room);
        onClose();
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveCreateRoom", handlerCreateRoom);

    return () => {
      connection.off("ReceiveCreateRoom", handlerCreateRoom);
    };
  }, []);

  return (
    <>
      <Window
        title="Create Room"
        width="600px"
        height="400px"
        onClose={onClose}
      >

        <div className="create-room__content">
          {currentStep === Step.ROOM_MODEL_SELECTION &&
              <RoomModelSelectionStep
                // models={roomModels}
                selectedModel={model}

                onModelSelection={setModel}
                onNextClick={() =>
                  setCurrentStep(Step.ROOM_INFORMATION)}
              />}

          {currentStep === Step.ROOM_INFORMATION && model &&
              <RoomInformationStep
                model={model}

                name={name}
                description={description}
                firstTag={firstTag}
                secondTag={secondTag}

                setName={setName}
                setDescription={setDescription}
                setFirstTag={setFirstTag}
                setSecondTag={setSecondTag}

                canShowSecondTagInput={!!firstTag.length}

                onChangeModelClick={() =>
                  setCurrentStep(Step.ROOM_MODEL_SELECTION)}
                onCreate={createRoom}
              />}
        </div>
      </Window>
    </>
  );
};

enum Step {
  ROOM_MODEL_SELECTION,
  ROOM_INFORMATION,
}