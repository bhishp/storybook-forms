import { Meta } from '@storybook/react';
import React from 'react';
import {
  SignupForm,
} from './example';

const meta: Meta = {
  title: 'WithFinalForm/Signup'
}
export default meta;

export const signup = () => (
  <>
    <p>
      This is an entire 'Form'. It has several Fields that are descendants of an overall FinalForm component.
      There is no need to supply a withFinalForm decorator here
    </p>
    <SignupForm />
  </>
);
