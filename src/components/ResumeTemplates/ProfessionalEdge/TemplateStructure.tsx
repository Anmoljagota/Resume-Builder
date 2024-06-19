import React from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import CustomDropdown from "../../common/CustomDropdown";
import { Template, UserProfile } from "@/utils/interfaces";
interface Props {
  currentTemplateConfig: Template;
}
const TemplateStructure = ({ currentTemplateConfig }: Props) => {
  const initialFormValues = {
    ...currentTemplateConfig["sections"],
  };

  //delete sections which cannot be customized
  delete initialFormValues.ProfileInformation;
  delete initialFormValues.ContactInformation;
  return (
    <div className="p-[16px]">
      <div>
        <Formik
          initialValues={initialFormValues}
          onSubmit={(values, actions) => {
            // TODO: update templateConfigs
            // onUpdateTemplateConfigs((prev) => {
            // const newUser = { ...prev };
            // // check if templateConfig with name templatePath already exists
            // const templateConfigIndex = newUser.templateConfigs.findIndex(
            //     (templateConfig) => templateConfig.name === templatePath
            // );
            // if (templateConfigIndex !== -1) {
            //     newUser.templateConfigs[templateConfigIndex].sections = values;
            // }
            // // if not, create a new templateConfig
            // else {
            //     newUser.templateConfigs = [
            //         ...newUser.templateConfigs,
            //         {
            //             name: templatePath,
            //             sections: values,
            //         },
            //     ];
            // }
            // return newUser;
            // });
          }}
        >
          {({ values }) => {
            return (
              <div className="">
                <Form>
                  <div className="flex flex-wrap gap-[16px] my-[24px]">
                    {Object.keys(values).map((key) => (
                      <div key={key} className="max-w-[400px]">
                        <CustomDropdown
                          selectedValue={values[key].position}
                          name={`${key}.position`}
                          label={`${key}`}
                          options={[
                            { label: "Left", value: "left" },
                            { label: "Right", value: "right" },
                          ]}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="mb-[16px] w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Update Resume Layout
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TemplateStructure;
