"use server";
import { convertFormDataToJson, getYupErrors, response } from "@/helpers/form-validation";
import { ResetPassword, changePassword } from "@/services/change-password-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
    oldPassword:Yup
                .string()
                .required("Required"),
    newPassword: Yup
                .string()
                .required("Required"),
    confirmPassword: Yup
                .string()
                .oneOf([Yup.ref("newPassword")], "Password fields don't match")
                .required("Required"),
});

const ResetFormSchema = Yup.object({
    code: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password fields don't match")
      .required("Required"),
  });

export const patchChangePasswordAction= async (prevState, formData) => {
    try {
        const fields = convertFormDataToJson(formData);

        FormSchema.validateSync(fields, { abortEarly: false });

        const res = await changePassword(fields);
        const data = await res.json();
        if (!res.ok) {
            return response(false, "", data?.validations);
        }

    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            return getYupErrors(err.inner);
        }

        throw err;
    }

    revalidatePath("/my-profile");
	redirect(`/my-profile?msg=${encodeURI("Password has been changed.")}`);
};

export const resetPasswordAction = async (prevState, formData) => {
    try {
      const fields = convertFormDataToJson(formData);
      console.log("fields",fields);
      ResetFormSchema.validateSync(fields, { abortEarly: false });
      const payload = {
        code: fields.code,
        password: fields.password
      }
  
      const res = await ResetPassword(payload);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return response(false, "", data?.validations);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return getYupErrors(err.inner);
      }
  
      throw err;
    }
  
    revalidatePath("/login");
    redirect(`/login?msg=${encodeURI("Your password has been changed.")}`);
  };