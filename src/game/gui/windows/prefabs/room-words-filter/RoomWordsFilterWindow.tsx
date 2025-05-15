import {FC, useRef, useState} from "react";
import Room from "../../../../../models/Room.ts";
import {Window} from "../../Window.tsx";
import {TabColumn} from "../room-preferences/components/TabColumn.tsx";
import "./RoomWordsFilterWindow.css";
import {TabColumnRow} from "../room-preferences/components/TabColumnRow.tsx";
import {Input} from "../../../forms/Input.tsx";
import {Action} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  room: Room,

  onClose: Action,
}

export const RoomWordsFilterWindow: FC<Props> = ({room, onClose}) => {
  const [ bannedWords, setBannedWords ] = useState<string[]>(room.bannedWords.slice());

  const banWordInput = useRef<HTMLInputElement>(null);

  const banWord = e => {
    e.preventDefault();

    if (!banWordInput.current || bannedWords.includes(banWordInput.current.value)) {
      return;
    }

    const word: string = banWordInput.current.value;

    if (!word.length) return;

    room.bannedWords.push(word);
    setBannedWords(prevState => [...prevState, word]);

    banWordInput.current.value = "";
  };

  const unbanWord = (word: string) => {
    const wordIndex: number = room.bannedWords.findIndex(w => w === word);

    if (!bannedWords.includes(word) || wordIndex === -1) return;

    room.bannedWords.splice(wordIndex, 1);
    setBannedWords(prevState => prevState.filter(w => w !== word));
  };

  return (
    <>
      <Window
        title="Words Filter"
        width="350px"
        height="250px"

        onClose={onClose}
      >

        <div className="words-filter__container">
          <div className="words-filter__list">
            <TabColumn title="Banned Words:">
              {bannedWords.map((word: string, index: number) =>
                  <TabColumnRow
                    key={index}

                    onClick={() => unbanWord(word)}
                  >

                    {word}
                  </TabColumnRow>)}
            </TabColumn>
          </div>

          <div className="words-filter__input">
            <form onSubmit={banWord}>
              <Input
                ref={banWordInput}
                placeholder="Add word…"
              />
            </form>
          </div>
        </div>
      </Window>
    </>
  );
};