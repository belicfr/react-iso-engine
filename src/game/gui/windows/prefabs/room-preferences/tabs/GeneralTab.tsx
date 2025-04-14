import {FC, useState} from "react";
import Room, {RoomRepository} from "../../../../../../models/Room.ts";
import {Input} from "../../../../forms/Input.tsx";
import {TextArea} from "../../../../forms/TextArea.tsx";

type Props = {
  room: Room,
};

export const GeneralTab: FC<Props> = ({room}) => {
  const [ name, setName ] = useState<string>(room.name);
  const [ description, setDescription ] = useState<string>(room.description);
  const [ firstTag, setFirstTag ] = useState<string>(room.tags[0] ?? "");
  const [ secondTag, setSecondTag ] = useState<string>(room.tags[1] ?? "");

  const tagInputProps = {
    minLength: 3,
    maxLength: 10,
  };

  const getRoomIndex = (room: Room): number =>
    RoomRepository.i().rooms.findIndex(r => r === room);

  const saveName = (name: string) => {
    const roomIndex: number = getRoomIndex(room);

    RoomRepository.i().rooms[roomIndex].name = name;
  };

  const saveDescription = (description: string) => {
    const roomIndex: number = getRoomIndex(room);

    RoomRepository.i().rooms[roomIndex].description = description;
  };

  const saveFirstTag = (tag: string) => {
    const roomIndex: number = getRoomIndex(room);

    RoomRepository.i().rooms[roomIndex].tags[0] = tag;
  };

  const saveSecondTag = (tag: string) => {
    const roomIndex: number = getRoomIndex(room);

    RoomRepository.i().rooms[roomIndex].tags[1] = tag;
  };

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