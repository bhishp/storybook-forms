import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import {
  EVT_ON_SUBMIT,
  EVT_RENDER,
  EVT_SUBMIT,
  DECORATOR_NAME,
} from 'storybook-forms-core';
import { Form } from 'react-final-form';
import { FinalFormPropsWithoutSubmit, PARAMETER_NAME } from './types';

export const withFinalForm = makeDecorator({
  name: DECORATOR_NAME,
  parameterName: PARAMETER_NAME,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    let submitter: () => void;
    channel.on(EVT_SUBMIT, () => submitter && submitter());
    const formProps = parameters as FinalFormPropsWithoutSubmit | undefined;
    const initialValues = (formProps && formProps.initialValues) || {};

    return (
      <Form
        onSubmit={v => {
          channel.emit(EVT_ON_SUBMIT, v);
          return {};
        }}
        {...formProps}
        initialValues={initialValues}
      >
        {props => {
          channel.emit(EVT_RENDER, props);
          if (!submitter) {
            submitter = props.handleSubmit;
          }
          return <form>{getStory(context)}</form>;
        }}
      </Form>
    );
  },
});

export default withFinalForm;
export * from './types';
