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
import { FormikProps } from 'formik';

const mapFormikProps: MapFormPropsFn = ({
  values,
  errors,
  touched,
  isValidating,
  isSubmitting,
  submitCount,
}: FormikProps<unknown> | undefined) => {
  return {
    values,
    errors,
    touched,
    isValidating,
    isSubmitting,
    submitCount,
  };
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <FormPanel mapFormPropsToState={mapFormikProps} />
      </AddonPanel>
    ),
    paramKey: PARAM_KEY,
  });
});
