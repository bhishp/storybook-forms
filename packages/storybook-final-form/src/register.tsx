import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import {
  ADDON_ID,
  PANEL_ID,
  PARAM_KEY,
  FormPanel,
  MapFormPropsFn,
  PANEL_TITLE,
} from 'storybook-forms-core';
import { FormRenderProps } from 'react-final-form';

const mapFinalFormProps: MapFormPropsFn = ({
  values,
  errors,
  touched,
  validating,
  submitting,
}: FormRenderProps<unknown> | undefined) => {
  return {
    values,
    errors,
    touched,
    isValidating: validating,
    isSubmitting: submitting,
    submitCount: 0, // TODO
  };
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <FormPanel mapFormPropsToState={mapFinalFormProps} />
      </AddonPanel>
    ),
    paramKey: PARAM_KEY,
  });
});
