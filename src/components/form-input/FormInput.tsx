import { ChangeEvent } from "react";
import { FormInputLabel, Group, Input } from "./StyledFormInput";

interface inputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  required?: boolean;
  value?: string;
}

interface FormInputProps {
  label: string;
  otherProps: inputProps;
}

export default function FormInput({ label, otherProps }: FormInputProps) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={!!otherProps.value && otherProps.value.length > 0}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}
