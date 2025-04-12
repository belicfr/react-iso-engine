import {ChangeEvent, FC, useState} from "react";
import Room from "../../../../../../models/Room.ts";
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

  return (
    <>
      <section className="room-preferences__general">
        <form>
          <Input
            label="Room Name:"
            minLength={3}
            maxLength={25}
            value={name}

            onChange={setName}
          />

          <TextArea
            label="Description:"
            maxLength={255}
            resize="none"
            rows={4}
            value={description}

            onChange={setDescription}
          />

          <div className="room-preferences__tags-container">
            <p className="room-preferences__tags-label">
              Tags:
            </p>

            <div className="room-preferences__tags-controls">
              <Input
                {...tagInputProps}

                value={firstTag}

                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstTag(e.target.value)}
              />

              {!!firstTag.length &&
                  <Input
                    {...tagInputProps}

                    value={secondTag}

                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSecondTag(e.target.value)}
                  />}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};