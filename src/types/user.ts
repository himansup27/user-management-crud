export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  // Easy to extend: just add new fields here
  // dateOfBirth?: string;
  // address?: string;
}

export type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
  minLength?: number;
  maxLength?: number;
};

export type FieldConfig = {
  name: keyof User;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  validation: ValidationRule;
  placeholder?: string;
  multiline?: boolean;
};
