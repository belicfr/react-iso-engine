import {FC} from "react";
import "./RoomModelSelectionStep.css";
import RoomTemplate, {RoomTemplateRepository} from "../../../../../../models/RoomTemplate.ts";
import {Button} from "../../../../buttons/Button.tsx";
import {Action} from "../../../../../../frameworks/utilities/Actions.ts";

type Props = {
  // models: RoomTemplate[],
  selectedModel: RoomTemplate|null,

  onModelSelection: (model: RoomTemplate) => void,
  onNextClick: Action,
};

export const RoomModelSelectionStep: FC<Props> = (
  {
    selectedModel, onModelSelection,
    onNextClick,
  }
) => {

  const models: RoomTemplate[] = RoomTemplateRepository.i().templates;

  return (
    <>
      <div className="room-model-selection__container">
        <h5 className="selector__title">
          Select a template!
        </h5>

        <div className="models__grid">
          {models.map((model: RoomTemplate) =>
            <div
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
                  {model.tilesCount()}
                  &nbsp;tile{model.tilesCount() > 1 ? 's' : ""}
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