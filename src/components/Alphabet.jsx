import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  EnglishAlphabet as EN,
  PolishAlphabet as PL,
  RussianAlphabet as RU,
} from "../alphabets";
import React, { useEffect, useState } from "react";

const Alphabet = () => {
  const [alphabet, setAlphabet] = useState(EN);

  useEffect(() => console.log(alphabet), [alphabet]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(alphabet);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAlphabet(items);
  };

  return (
    <div className="Alphabet">
      {/* {EN &&
        EN.map((letter, index) => (
          <div key={index} className="key__button">
            {letter}
          </div>
        ))} */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable direction="horizontal" droppableId="characters">
          {(provided) => (
            <div
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {alphabet.map((letter, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="key__button"
                    >
                      {letter}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Alphabet;
