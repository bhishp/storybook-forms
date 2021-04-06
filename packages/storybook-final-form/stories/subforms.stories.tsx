import { Meta } from '@storybook/react';
import React from 'react';
import { withFinalForm } from '../dist';
import {
  PersonalInfoSubForm,
  personalInfoInitialValues,
  personalInfoValidationSchema,
  ProfessionalInfoSubForm,
  professionalInfoInitialValues,
  professionalInfoValidationSchema,
  FeedbackSubform,
  feedbackInitialValues, PersonalInfo, ProfessionalInfo, Feedback,
} from './example';
import { DecoratorParams } from '../src/types';
import { makeFinalFormValidator } from './lib';

const meta: Meta = {
  title: 'WithFinalForm/Subforms'
}
export default meta;

export const personalInfoSubform = () => (
  <>
    <p>
      The decorator can wrap Components that include Fields (or anything else expecting FinalForm context).
      This allows us to better componentise our larger forms.
    </p>
    <PersonalInfoSubForm />
  </>
);
personalInfoSubform.decorators = [withFinalForm];
const personalInfoParams: DecoratorParams<PersonalInfo> = {
  finalForm: {
    initialValues: personalInfoInitialValues,
    validate: makeFinalFormValidator(personalInfoValidationSchema),
  }
};
personalInfoSubform.parameters = personalInfoParams;

export const professionalInfoSubform = () => (
  <>
    <p>
      Here we can play with the Professional Info subform as standalone
    </p>
    <ProfessionalInfoSubForm />
  </>
);
const professionalInfoParams: DecoratorParams<ProfessionalInfo> = {
  finalForm: {
    initialValues: professionalInfoInitialValues,
    validate: makeFinalFormValidator(professionalInfoValidationSchema),
  }
};
professionalInfoSubform.story = {
  decorators: [withFinalForm],
  parameters: professionalInfoParams
};

export const feedbackSubform = () => (
  <>
    <p>
      With better tooling it makes it easier for us to componentise and compose our subforms.
      Here we re-use the above PersonalInfoSubform in our FeedbackSubform.
    </p>
    <FeedbackSubform />
  </>
);
const feedbackParams: DecoratorParams<Feedback> = {
  finalForm: {
    initialValues: feedbackInitialValues,
    validate: makeFinalFormValidator(personalInfoValidationSchema),
  }
};
feedbackSubform.story = {
  decorators: [withFinalForm],
  parameters: feedbackParams
};
