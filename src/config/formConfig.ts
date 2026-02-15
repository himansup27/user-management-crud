import { FieldConfig } from '../types/user';

/**
 * FORM CONFIGURATION
 * 
 * This is the central place to define all form fields.
 * To add a new field:
 * 1. Add the field to the User interface in types/user.ts
 * 2. Add a new FieldConfig object to this array
 * 3. That's it! The form will automatically render the new field with validation
 */
export const formFieldsConfig: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'First name must be between 2-50 characters',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'Last name must be between 2-50 characters',
    },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '1234567890',
    validation: {
      required: true,
      pattern: /^[0-9]{10}$/,
      minLength: 10,
      maxLength: 10,
      message: 'Phone number must be exactly 10 digits',
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    validation: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Please enter a valid email address',
    },
  },
  
  // EXAMPLE: To add a new field, uncomment and modify:
  // {
  //   name: 'dateOfBirth',
  //   label: 'Date of Birth',
  //   type: 'date',
  //   validation: {
  //     required: false,
  //   },
  // },
  // {
  //   name: 'address',
  //   label: 'Address',
  //   type: 'textarea',
  //   placeholder: 'Enter address',
  //   multiline: true,
  //   validation: {
  //     required: false,
  //     maxLength: 200,
  //     message: 'Address must not exceed 200 characters',
  //   },
  // },
];