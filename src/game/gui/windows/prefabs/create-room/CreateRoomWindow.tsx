import {FC, useState} from "react";
import {Window} from "../../Window.tsx";
import "./CreateRoomWindow.css";
import {RoomInformationStep} from "./steps/RoomInformationStep.tsx";
import {RoomModelSelectionStep} from "./steps/RoomModelSelectionStep.tsx";
import RoomTemplate from "../../../../../models/RoomTemplate.ts";
import Room, {RoomRepository} from "../../../../../models/Room.ts";
import User from "../../../../../models/User.ts";

type Props = {
  onClose: () => void,
};

export const CreateRoomWindow: FC<Props> = ({onClose}) => {
  // const roomModels = useMemo<RoomTemplate[]>(() => [
  //   new RoomTemplate(1, "", "Base", 25),
  //   new RoomTemplate(2, "", "XL", 50),
  // ], []);

  const [model, setModel] = useState<RoomTemplate|null>(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [firstTag, setFirstTag] = useState<string>("");
  const [secondTag, setSecondTag] = useState<string>("");

  const [currentStep, setCurrentStep] = useState<Step>(Step.ROOM_MODEL_SELECTION);

  function createRoom() {
    const rooms = RoomRepository.i().rooms;
    rooms.push(new Room(Math.abs(Math.random() * 100), name, description, new User(2, "Player"), [firstTag, secondTag], 10, 0,
      model!));
  }

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