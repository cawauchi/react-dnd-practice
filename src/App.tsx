import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "item0" },
    { id: 2, text: "item1" },
    { id: 3, text: "item2" },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return console.log("destinationがありません！");
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <div className="dragDropArea">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapShot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {/* innerRefはドラッグしている以外の要素の制御をしている */}
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={String(item.text)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="item"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {/* draggableの領域を広げる */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
