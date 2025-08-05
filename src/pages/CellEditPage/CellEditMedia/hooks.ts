import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Active,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

interface BaseItem {
  id: string;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
}

export const useSortableMedia = (items, onChange) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: { active: Active }) => {
    setActive(active);
  };

  const handleDragEnd = ({ active, over }: { active: Active; over: any }) => {
    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };

  const handleDragCancel = () => {
    setActive(null);
  };

  // Export handlers along with sensors and activeItem
  return {
    sensors,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
