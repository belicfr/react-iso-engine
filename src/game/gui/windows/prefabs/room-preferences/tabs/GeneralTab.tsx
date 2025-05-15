import {FC, useEffect, useState} from "react";
import {Input} from "../../../../forms/Input.tsx";
import {TextArea} from "../../../../forms/TextArea.tsx";
import {PublicRoomDto} from "../../../../../../models/dto/public/PublicRoomDto.ts";
import {useConnection} from "../../../../../../io/ConnectionContext.tsx";
import {RoomAction} from "../../../../../../frameworks/types/Actions.ts";
import {Handler, HandlerResponseCode} from "../../../../../../io/HandlerResponse.ts";
import {useAlerts} from "../../../AlertsContext.tsx";

type Props = {
  room: PublicRoomDto,

  onRoomUpdate: RoomAction,
};

export const GeneralTab: FC<Props> = ({room, onRoomUpdate}) => {
  const [ name, setName ] = useState<string>(room.name);
  const [ description, setDescription ] = useState<string>(room.description);
  const [ firstTag, setFirstTag ] = useState<string>(room.tagOne ?? "");
  const [ secondTag, setSecondTag ] = useState<string>(room.tagTwo ?? "");

  const connection = useConnection();

  const tagInputProps = {
    minLength: 3,
    maxLength: 10,
  };

  const saveName = (name: string) => {
    connection.invoke("SendNewRoomName", room.id, name);

    room.name = name;
    onRoomUpdate(room);
  };

  const saveDescription = (description: string) => {
    connection.invoke("SendNewRoomDescription", room.id, description);

    room.description = description;
    onRoomUpdate(room);
  };

  const saveFirstTag = (tag: string) => {
    connection.invoke("SendNewRoomTag", room.id, 0, tag);

    room.tagOne = tag;
    onRoomUpdate(room);
  };

  const saveSecondTag = (tag: string) => {
    connection.invoke("SendNewRoomTag", room.id, 1, tag);

    room.tagTwo = tag;
    onRoomUpdate(room);
  };

  const {addAlert} = useAlerts();

  useEffect(() => {
    const handlerOnRoomInfoUpdate: Handler = response => {
      console.log(response);
      if (response.code === HandlerResponseCode.FAIL) {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveNewRoomName", handlerOnRoomInfoUpdate);
    connection.on("ReceiveNewRoomDescription", handlerOnRoomInfoUpdate);
    connection.on("ReceiveNewRoomTag", handlerOnRoomInfoUpdate);

    return () => {
      connection.off("ReceiveNewRoomName", handlerOnRoomInfoUpdate);
      connection.off("ReceiveNewRoomDescription", handlerOnRoomInfoUpdate);
      connection.off("ReceiveNewRoomTag", handlerOnRoomInfoUpdate);
    };
  }, []);

  return (
    <>
      <section className="room-preferences__general">
        <form>
          <Input
            label="Room Name:"
            minLength={3}
            maxLength={25}
            value={name}

            onChange={e => setName(e.target.value)}
            onBlur={e => saveName(e.target.value)}
          />

          <TextArea
            label="Description:"
            maxLength={255}
            resize="none"
            rows={4}
            value={description}

            onChange={e => setDescription(e.target.value)}
            onBlur={e => saveDescription(e.target.value)}
          />

          <div className="room-preferences__tags-container">
            <p className="room-preferences__tags-label">
              Tags:
            </p>

            <div className="room-preferences__tags-controls">
              <Input
                {...tagInputProps}

                value={firstTag}

                onChange={e => setFirstTag(e.target.value)}
                onBlur={e => saveFirstTag(e.target.value)}
              />

              {!!firstTag.length &&
                  <Input
                    {...tagInputProps}

                    value={secondTag}

                    onChange={e => setSecondTag(e.target.value)}
                    onBlur={e => saveSecondTag(e.target.value)}
                  />}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};