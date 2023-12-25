import { hiroshimas } from "../../data/hiroshima";

export const toId = (place: string) => {
  const split = place.split(/(市|町)/);
  const agreement = hiroshimas.filter(
    (hirosima) => hirosima.name.indexOf(split[0]) === 0
  );
  return agreement.length > 0 ? agreement[0].id : 0;
};
