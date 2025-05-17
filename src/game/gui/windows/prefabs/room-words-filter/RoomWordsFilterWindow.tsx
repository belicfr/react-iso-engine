import {FC, useEffect, useRef, useState} from "react";
import {Window} from "../../Window.tsx";
import {TabColumn} from "../room-preferences/components/TabColumn.tsx";
import "./RoomWordsFilterWindow.css";
import {TabColumnRow} from "../room-preferences/components/TabColumnRow.tsx";
import {Input} from "../../../forms/Input.tsx";
import {Action} from "../../../../../frameworks/types/Actions.ts";
import {RestrictedRoomDto} from "../../../../../models/dto/restricted/RestrictedRoomDto.ts";
import {useAlerts} from "../../AlertsContext.tsx";
import {useConnection} from "../../../../../io/ConnectionContext.tsx";
import {Handler, HandlerResponseCode} from "../../../../../io/HandlerResponse.ts";

type Props = {
  room: RestrictedRoomDto,

  onClose: Action,
}

export const RoomWordsFilterWindow: FC<Props> = ({room, onClose}) => {
  const [ bannedWords, setBannedWords ] = useState<string[]>([]);

  const banWordInput = useRef<HTMLInputElement>(null);

  const banWord = e => {
    e.preventDefault();

    if (!banWordInput.current || bannedWords.includes(banWordInput.current.value)) {
      return;
    }

    const word: string = banWordInput.current.value;

    if (!word.length) return;

    connection.invoke("SendAddBannedWord", room.id, word);
  };

  const unbanWord = (word: string) => {
    if (!bannedWords.includes(word)) return;

    connection.invoke("SendRemoveBannedWord", room.id, word);
  };

  const connection = useConnection();
  const { addAlert } = useAlerts();

  useEffect(() => {
    connection.invoke("SendRoom", room.id);

    const handlerRoom = (response: RestrictedRoomDto) => {
      if (response) {
        setBannedWords(response.bannedWords);
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: "Room cannot be loaded. (Server Error)",
        });
      }
    };

    const handlerAddBannedRoom: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        setBannedWords(prevState => [...prevState, response.props[0]]);

        if (banWordInput.current) {
          banWordInput.current.value = "";
        }
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    const handlerRemoveBannedRoom: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        setBannedWords(prevState => prevState.filter(
          w => w !== response.props[0]));
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveRoom", handlerRoom);
    connection.on("ReceiveAddBannedWord", handlerAddBannedRoom);
    connection.on("ReceiveRemoveBannedWord", handlerRemoveBannedRoom);

    return () => {
      connection.off("ReceiveRoom", handlerRoom);
      connection.off("ReceiveAddBannedWord", handlerAddBannedRoom);
      connection.off("ReceiveRemoveBannedWord", handlerRemoveBannedRoom);
    };
  }, []);

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