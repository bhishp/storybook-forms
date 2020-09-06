import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import {
  EVT_ON_SUBMIT,
  EVT_RENDER,
  EVT_SUBMIT,
  DECORATOR_NAME,
} from 'storybook-forms-core';
import { Form, Formik } from 'formik';
import { ConfigWithoutSubmit, PARAMETER_NAME } from './types';

export const withForms = makeDecorator({
  name: DECORATOR_NAME,
  parameterName: PARAMETER_NAME,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    let submitter: () => void;
    channel.on(EVT_SUBMIT, () => submitter && submitter());
    const formikConfig = parameters as ConfigWithoutSubmit | undefined;
    const initialValues = (formikConfig && formikConfig.initialValues) || {};

    return (
      <Formik
        onSubmit={(v, { setSubmitting }) => {
          channel.emit(EVT_ON_SUBMIT, v);
          setSubmitting(false);
        }}
        {...formikConfig}
        initialValues={initialValues}
      >
        {props => {
          channel.emit(EVT_RENDER, props);
          if (!submitter) {
            submitter = props.submitForm;
          }
          return <Form>{getStory(context)}</Form>;
        }}
      </Formik>
    );
  },
});

export const withFormik = withForms;
export default withForms;
// export * from 'storybook-forms-core';
export * from './types';
