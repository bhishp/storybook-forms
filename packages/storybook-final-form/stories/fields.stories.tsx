import { Meta } from '@storybook/react';
import React from 'react';
import withFinalForm from '../dist';
import {
  MyCheckbox,
  MySelect,
  MyTextInput,
} from './example';

const meta: Meta = {
  decorators: [withFinalForm],
  title: 'WithFinalForm/Fields'
}
export default meta;

// You may want to demonstrate a library of your custom-made fields

export const myCheckbox = () => (
  <MyCheckbox name="likeFinalForm">Do you like Final Form?</MyCheckbox>
);
myCheckbox.parameters = {
  finalForm: {
    initialValues: {
      likeFinalForm: true,
    }
  }
};

export const mySelect = () => (
  <MySelect name="finalFormRating" label="How much do you like finalForm?" >
    <option value="3">I like it</option>
    <option value="4">I really like it</option>
    <option value="5">I absolutely love it</option>
  </MySelect>
);
mySelect.parameters = {
  finalForm: {
    initialValues: {
      finalFormRating: "5",
    }
  }
};

export const myTextInput = () => (
  <MyTextInput name="finalFormTweet" label="Describe final form in 80 characters" placeholder="I love final form because..." />
);
myTextInput.parameters = {
  finalForm: {
    initialValues: {
      finalFormTweet: '',
    }
  }
};
