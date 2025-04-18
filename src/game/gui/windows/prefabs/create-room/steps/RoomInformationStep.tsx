import {ChangeEvent, FC} from "react";
import {Input} from "../../../../forms/Input.tsx";
import {TextArea} from "../../../../forms/TextArea.tsx";
import {Button} from "../../../../buttons/Button.tsx";
import "./RoomInformationStep.css";
import RoomTemplate from "../../../../../../models/RoomTemplate.ts";

type Props = {
  model: RoomTemplate,
  name: string,
  description: string,
  firstTag: string,
  secondTag: string,

  setName: (name: string) => void,
  setDescription: (description: string) => void,
  setFirstTag: (tag: string) => void,
  setSecondTag: (tag: string) => void,

  canShowSecondTagInput: boolean,

  onChangeModelClick: () => void,
  onCreate: () => void,
};

export const RoomInformationStep: FC<Props> = (
  {
    model,
    name,
    description,
    firstTag,
    secondTag,

    setName,
    setDescription,
    setFirstTag,
    setSecondTag,

    canShowSecondTagInput,

    onChangeModelClick,
    onCreate,
  }
) => {

  const tagInputProps = {
    minLength: 3,
    maxLength: 10,
  };

  return (
    <>
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

            value={name}

            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)}
          />

          <TextArea
            label="Description:"
            resize="none"
            rows={4}

            value={description}

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

                value={firstTag}

                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstTag(e.target.value)}
              />

              {canShowSecondTagInput &&
                  <Input
                    {...tagInputProps}

                    value={secondTag}

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
            {model.tilesCount()}
            &nbsp;tile{model.tilesCount() > 1 ? 's' : ""}
          </p>
        </div>

        <div className="create-room__actions">
          <Button
            color="light"

            onClick={onChangeModelClick}
          >

            Change Template
          </Button>

          <Button
            color="success"

            onClick={onCreate}
          >

            Create
          </Button>
        </div>
      </aside>
    </>
  );
};