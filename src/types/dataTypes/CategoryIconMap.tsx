import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faRocket,
  faEarthAmericas,
  faFireFlameCurved,
  faFlag,
  faHandcuffs,
  faPeopleGroup,
  faTents,
} from "@fortawesome/free-solid-svg-icons";
export const CategoriesList = [
  "War Crimes",
  "Strikes and Attacks",
  "Refugees And IDPs",
  "Protest Abroad",
  "Environmental Terrorism",
  "International Response",
  "Media and Disinformation",
  "Russia"
] as const;
export type GenericCategoryMap<T> = {
  [key in typeof CategoriesList[number]]: T;
};
export type CategoryIconProps = GenericCategoryMap<IconProp>;
export function isCategoryScope(
  arg: any
): arg is typeof CategoriesList[number] {
  if (!arg) return false;
  return arg in categoryIconMap;
}
const categoryIconMap: CategoryIconProps = {
  "War Crimes": faHandcuffs,
  "Strikes and Attacks": faRocket,
  "Refugees And IDPs": faTents,
  "Protest Abroad": faPeopleGroup,
  "Environmental Terrorism": faFireFlameCurved,
  "International Response": faEarthAmericas,
  "Media and Disinformation": faNewspaper,
  "Russia": faFlag,
};
export const categoryPermissions: GenericCategoryMap<boolean> = {
  "War Crimes": false,
  "Strikes and Attacks": false,
  "Refugees And IDPs": false,
  "Protest Abroad": false,
  "Environmental Terrorism": false,
  "International Response": false,
  "Media and Disinformation": false,
  "Russia": false
}
export default categoryIconMap;
