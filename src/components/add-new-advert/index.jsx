"use client";
import { useFormState } from "react-dom";
import "./style.scss";
import Spacer from "../common/misc/spacer";
import CommonInformationSection from "./common-information";
import AddressInformationSection from "./address-information";
import AddPropertyPropertiesSection from "./properties-section";
import AddAdvertImageSection from "./image-section";
import SubmitButton from "../common/buttons/submit-button";
import { initialResponse } from "@/helpers/form-validation";
import { createAdvertAction } from "@/actions/advert-action";

const NewAdvertForm = ({ advertTypes,  cities, districts, categories }) => {

  const [state, dispatch] = useFormState(createAdvertAction, initialResponse);

  return (
   <>
    {!state?.success && state.message ? (
      <div className="alert alert-danger">
        {state.message}
      </div>
    ) : (
      ""
    )}
    <form className="add-new-advert" noValidate action={dispatch}>
      <CommonInformationSection 
              advertTypes={advertTypes}
              state={state}
              />
      <Spacer height={50} />
      <AddressInformationSection  
              // countries={countries}
              cities={cities}
              districts={districts}
              state={state}
              />
      <Spacer height={50} />
      <AddPropertyPropertiesSection 
              categories={categories}
              state={state}
              />
      <Spacer height={50} />
      <AddAdvertImageSection 
              state={state}
              />
      <Spacer height={50} />
      <div className="button">
        <SubmitButton title="Create"/>
      </div>
      <Spacer/>
    </form>
   </>
  );
};

export default NewAdvertForm;
