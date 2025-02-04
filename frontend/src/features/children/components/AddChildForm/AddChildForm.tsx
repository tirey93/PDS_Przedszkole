import { Box, Button } from "@radix-ui/themes";
import classes from "./AddChildForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    AddChildFormInputs,
    CHILD_BIRTHDATE_HELP,
    CHILD_FIRST_NAME_HELP,
    CHILD_GROUP_HELP,
    CHILD_LAST_NAME_HELP,
    CHILD_PARENT_HELP,
    useAddChildForm,
} from "@/features/children/components/AddChildForm/hooks/useAddChildForm";
import { Select } from "@/components/Select/Select";
import { Group } from "@/features/groups/types/Group";
import { User } from "@/types/User";

type AddChildFormProps = {
    onSubmit: (inputs: AddChildFormInputs) => void;
    onCancel: () => void;
    groups: Group[];
    parents: User[];
    isLoading?: boolean;
    initialValue?: Partial<AddChildFormInputs>;
};

export const AddChildForm = ({ onSubmit, isLoading, onCancel, initialValue, groups, parents }: AddChildFormProps) => {
    const { register, handleSubmit, formState } = useAddChildForm(initialValue);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Box className={classes.row}>
                <Input
                    {...register("firstName")}
                    label="Imię"
                    error={formState.errors?.firstName?.message}
                    help={CHILD_FIRST_NAME_HELP}
                />

                <Input
                    {...register("lastName")}
                    label="Nazwisko"
                    error={formState.errors?.lastName?.message}
                    help={CHILD_LAST_NAME_HELP}
                />
            </Box>

            <Select
                {...register("parentId")}
                options={parents.map((parent) => ({
                    value: parent.id.toString(),
                    label: `${parent.firstName} ${parent.lastName}`,
                }))}
                value={initialValue?.parentId}
                disabled={!!initialValue?.parentId}
                label="Rodzic"
                error={formState.errors?.parentId?.message}
                help={CHILD_PARENT_HELP}
            />

            <Select
                {...register("groupId")}
                options={groups.map((group) => ({ value: group.id.toString(), label: group.name }))}
                value={initialValue?.groupId}
                disabled={!!initialValue?.groupId}
                label="Grupa"
                error={formState.errors?.groupId?.message}
                help={CHILD_GROUP_HELP}
            />

            <Input
                {...register("dateOfBirth")}
                label="Data urodzenia"
                type="date"
                error={formState.errors?.dateOfBirth?.message}
                help={CHILD_BIRTHDATE_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
