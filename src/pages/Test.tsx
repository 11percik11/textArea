import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableList } from "../comps/modals/SortableList";

const draggableList = [
  {
    id: 1,
    name: "Mike",
  },
  { id: 2, name: "Michael" },
  { id: 3, name: "Mason" },
  { id: 4, name: "Miller" },
  { id: 5, name: "Milner" },
  { id: 6, name: "Merry" },
];

export default function Test() {
  const [items, setItems] = useState(draggableList);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            {item.name}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  );
}
