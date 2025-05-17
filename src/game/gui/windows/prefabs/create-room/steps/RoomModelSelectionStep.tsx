import {FC, useEffect, useState} from "react";
import "./RoomModelSelectionStep.css";
import {Button} from "../../../../buttons/Button.tsx";
import {Action, RoomTemplateAction} from "../../../../../../frameworks/types/Actions.ts";
import {PublicRoomTemplateDto} from "../../../../../../models/dto/public/PublicRoomTemplateDto.ts";
import {useConnection} from "../../../../../../io/ConnectionContext.tsx";
import {useRoomTemplates} from "../../../../../../io/rooms/RoomTemplatesContext.tsx";

type Props = {
  selectedModel: PublicRoomTemplateDto|null,

  onModelSelection: RoomTemplateAction,
  onNextClick: Action,
};

export const RoomModelSelectionStep: FC<Props> = (
  {
    selectedModel, onModelSelection,
    onNextClick,
  }
) => {

  const connection = useConnection();
  const templates = useRoomTemplates();

  useEffect(() => {
    connection.invoke("SendRoomTemplates");
  }, []);

  return (
    <>
      <div className="room-model-selection__container">
        <h5 className="selector__title">
          Select a template!
        </h5>

        <div className="models__grid">
          {templates.map((model: PublicRoomTemplateDto, i: number) =>
            <div
              key={i}
              className={
                "model__card"
                + (selectedModel === model ? " model-active" : "")
              }

              onClick={() => onModelSelection(model)}
            >

              <div className="model__preview"></div>

              <div className="model__information">
                <p className="model__name">
                  {model.name}
                </p>

                <p className="model__tiles-count">
                  {model.tilesCount}
                  &nbsp;tile{model.tilesCount > 1 ? 's' : ""}
                </p>
              </div>
            </div>)}
        </div>

        <div className="models__actions">
          <Button
            disabled={!selectedModel}

            onClick={onNextClick}
          >

            {selectedModel
              ? "Next"
              : "Please select a template"}
          </Button>
        </div>
      </div>
    </>
  );
};