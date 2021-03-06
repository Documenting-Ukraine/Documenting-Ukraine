import { useState } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { Russia } from "../../../../types";
import {
  SportsAndCultureResponses,
  isSportsResponseType,
} from "../../../../types/dataTypes/docTypes/Russia";
import {
  isOption,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const sportsResponseTypeOptions = transformSingleList([
  ...SportsAndCultureResponses,
]);

const SportsAndCulture = ({
  defaultInputs,
}: {
  defaultInputs?: Russia;
}): JSX.Element => {
  const sportAndCultureType =
    defaultInputs?.russian_record_type === "Sports and Culture Responses";
  const [responseType, setResponseType] = useState<
    typeof SportsAndCultureResponses[number] | undefined
  >(
    sportAndCultureType
      ? defaultInputs?.russian_record_response_type
      : undefined
  );
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormInputs
        title="Organization Name"
        name="organizationName"
        inputType="text"
        required
        defaultValue={
          sportAndCultureType ? defaultInputs?.organization_name : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            organization_name: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Organization Type (ex. soccer, football, workers union etc)"
        name="organizationType"
        defaultValue={
          sportAndCultureType ? defaultInputs?.organization_type : undefined
        }
        inputType="text"
        required
        customValidation={(e) => {
          updateStoreProps({
            organization_type: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Response Type"
        name="responseType"
        dropDown={sportsResponseTypeOptions}
        defaultDropDownValue={
          responseType ? transformOptions(responseType) : undefined
        }
        customDropdownFunc={(e) => {
          if (isOption(e) && isSportsResponseType(e.value)) {
            setResponseType(e.value);
            updateStoreProps({
              russian_record_response_type: e.value,
            });
          }
        }}
        required
      />
      {responseType === "Other" && (
        <FormInputs
          defaultValue={
            sportAndCultureType
              ? defaultInputs?.russian_record_custom_response_type
              : undefined
          }
          title="Custom Response Type"
          name={"customResponseType"}
          inputType="text"
          required={true}
          customValidation={(e) => {
            updateStoreProps({
              russian_record_custom_response_type: e,
            });
            return { err: false, message: "" };
          }}
        />
      )}
      {responseType === "Donation" && (
        <FormInputs
          title="Donation Valuation"
          name={"donationValuation"}
          inputType="number"
          required={false}
          customValidation={(e) => {
            updateStoreProps({
              donation_valuation: parseInt(e),
            });
            return { err: false, message: "" };
          }}
          defaultValue={
            sportAndCultureType
              ? defaultInputs?.donation_valuation?.toString()
              : undefined
          }
        />
      )}
      <FormDateInputs
        title="Date of Announcement"
        name={"dateOfAnnouncement"}
        timeInput={false}
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_of_announcement: e.toString(),
          });
        }}
        defaultValue={
          sportAndCultureType
            ? new Date(defaultInputs?.date_of_announcement)
            : new Date()
        }
        required
      />
    </>
  );
};
export default SportsAndCulture;
