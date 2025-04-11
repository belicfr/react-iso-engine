import {ChangeEvent, FC, useState} from "react";
import {Window} from "../../Window.tsx";
import "./CreateRoomWindow.css";
import {Button} from "../../../buttons/Button.tsx";
import {Input} from "../../../forms/Input.tsx";
import {TextArea} from "../../../forms/TextArea.tsx";

type Props = {
  onClose: () => void,
};

export const CreateRoomWindow: FC<Props> = ({onClose}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [firstTag, setFirstTag] = useState<string>("");
  const [secondTag, setSecondTag] = useState<string>("");

  const tagInputProps = {
    minLength: 3,
    maxLength: 10,
  };

  return (
    <>
      <Window
        title="Create Room"
        width="600px"
        height="400px"
        onClose={onClose}
      >

        <div className="create-room__content">
          <main className="create-room__form">
            <h5 className="form__title">
              Create your own Room!
            </h5>

            <form className="form__container">
            {/*
            TODO:
              - name
              - description
              - 0..2 tags
            */}
              <Input
                label="Name:"
                placeholder="Pretty Place!"

                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)}
              />

              <TextArea
                label="Description:"
                resize="none"

                rows={4}

                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)}
              />

              <div className="form__tags-inputs">
                <p className="inputs__label">
                  Tags:
                </p>

                <div className="inputs__container">
                  <Input
                    {...tagInputProps}

                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstTag(e.target.value)}
                  />

                  {!!firstTag.length &&
                      <Input
                        {...tagInputProps}

                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setSecondTag(e.target.value)}
                      />}
                </div>
              </div>
            </form>
          </main>

          <aside className="create-room__preview">
            <div className="create-room__info">
              <div className="room-model__picture"></div>

              <p className="room-model__tiles">
                0 tiles
              </p>
            </div>

            <div className="create-room__actions">
              <Button color="success" onClick={() => {}}>
                Create
              </Button>
            </div>
          </aside>
        </div>
      </Window>
    </>
  );
};