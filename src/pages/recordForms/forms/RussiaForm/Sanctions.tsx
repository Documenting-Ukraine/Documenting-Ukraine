import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { Russia } from "../../../../types";
import {
  isItemInList,
  SanctionType,
} from "../../../../types/dataTypes/DataLists";

import {
  isOption,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const sanctionTypeOptions = transformSingleList([...SanctionType]);

const Sanctions = ({
  defaultInputs,
}: {
  defaultInputs?: Russia;
}): JSX.Element => {
  const sanctionType =
    defaultInputs?.russian_record_type === "Sanctions vs. Russia";
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormInputs
        title="Sanction Type"
        name="sanctionType"
        dropDown={sanctionTypeOptions}
        required
        defaultDropDownValue={
          sanctionType
            ? transformOptions(defaultInputs.sanction_type)
            : undefined
        }
        customDropdownFunc={(e) => {
          if (
            isOption(e) &&
            isItemInList<typeof SanctionType[number]>(e.value, SanctionType)
          )
            updateStoreProps({
              sanction_type: e.value,
            });
        }}
      />
      <FormInputs
        title="Sanction Name"
        name="sanctionName"
        inputType="text"
        required={false}
        defaultValue={sanctionType ? defaultInputs?.sanction_name : undefined}
        customValidation={(e) => {
          updateStoreProps({
            sanction_name: e,
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
};
export default Sanctions;
