import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    MIN_PASSWORD_LENGTH,
    PASSWORD_CONFIRM_REQUIREMENT,
    PASSWORD_REQUIREMENT,
} from "@/features/users/constants/password";

export type AddUserFormInputs = {
    login: string;
    password: string;
    confirmPassword: string;
    lastName: string;
    firstName: string;
};

export const FIRST_NAME_REQUIREMENT = "Minimum 3 znaki";
export const LAST_NAME_REQUIREMENT = "Minimum 2 znaki";
export const LOGIN_REQUIREMENT = "Minimum 6 znaków, białe znaki są niedozwolone";

export const useAddUserForm = () => {
    const requirements = yup.object({
        password: yup.string().required(PASSWORD_REQUIREMENT).min(MIN_PASSWORD_LENGTH, PASSWORD_REQUIREMENT),
        confirmPassword: yup
            .string()
            .required(PASSWORD_CONFIRM_REQUIREMENT)
            .test("passwords-match", PASSWORD_CONFIRM_REQUIREMENT, function (value) {
                return this.parent.password === value;
            }),
        firstName: yup.string().required(FIRST_NAME_REQUIREMENT).min(3, FIRST_NAME_REQUIREMENT),
        lastName: yup.string().required(LAST_NAME_REQUIREMENT).min(3, LAST_NAME_REQUIREMENT),
        login: yup
            .string()
            .required(LOGIN_REQUIREMENT)
            .min(6, LOGIN_REQUIREMENT)
            .test("whitespace_validation", LOGIN_REQUIREMENT, (value) => !/\s/.test(value)),
    });

    return useForm<AddUserFormInputs>({
        resolver: yupResolver<AddUserFormInputs>(requirements),
    });
};
