# storybook-final-form

A [Storybook](https://storybook.js.org/) Addon and Decorator to wrap FinalForm Fields and track their state in a Panel.

![example screenshot](https://user-images.githubusercontent.com/12024258/70381969-9c13b400-194b-11ea-8444-582933bf30f5.png)

You can see the example stories in action [TODO](#).

Thanks to [@erikras](https://twitter.com/erikras) for giving us the amazing [final form](https://github.com/final-form/final-form) library and making forms great again.

## Install

```sh
npm install --save-dev storybook-final-form
```

Then register the addon in `.storybook/main.js`

```ts
module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['storybook-final-form/register'],
};
```

## Usage

Suppose you split your forms into smaller, re-usable components and these 'subforms' rely on final form context, each of these
sub-forms may be used to build up a larger form, but you still want to test and run them independently. You can use the withFinalForm
decorator so that we can wrap the subform in a FinalForm context provider, which will pass down the context as normal.

Given a simple subform:

```tsx
import React from 'react';
import { Field } from 'react-final-form';

const PersonalInfoSubform = () => (
  <div>
    <Field name="forename" component="input" />
    <Field name="surname" component="input" />
  </div>
);

export default PersonalInfoSubform;
```

You add the `withFinalForm` decorator to your stories and can pass any `FormProps` as a parameter to the individual story.

```tsx
export const personalInfoSubform = () => (
  <>
    <p>
      The decorator can wrap Components that include Fields (or anything else
      expecting FinalForm context). This allows us to better componentise our
      larger forms.
    </p>
    <PersonalInfoSubForm />
  </>
);
personalInfoSubform.decorators = [withFinalForm];
// can use the DecoratorParams type and pass a type for type-safety of initialValues
const personalInfoParams: DecoratorParams<PersonalInfo> = {
  finalForm: {
    initialValues: personalInfoInitialValues,
    validate: personalInfoValidator,
  },
};
personalInfoSubform.parameters = personalInfoParams;
```

This gives you the benefit of rendering final form Fields that are expecting FinalForm context, but also to track the key final form state
within the storybook panel below.

See the [example stories](https://github.com/bhishp/storybook-forms/blob/master/packages/storybook-final-form/) for further examples

### Legacy story format

Example with the `storiesOf` syntax.

```tsx
import { storiesOf } from '@storybook/react';
import withFinalForm from 'storybook-final-form';

import PersonalInfoSubform from '<your_component_path>/PersonalInfoSubform';

storiesOf('Example', module)
  .addDecorator(withFinalForm)
  .add('default', () => <PersonalInfoSubform />, {
    finalForm: {
      initialValues: {
        forename: 'John',
        surname: 'Johnerson',
      },
    },
  });
```

## Arguments

You can pass any FF `Form` component props (initialValues, validate, etc) as arguments to a story.
These props must be passed under the `finalForm` parameter key.

If no initial values are supplied, `{}` will be used.

```tsx
export const myTextInput = () => (
  <MyTextInput
    name="finalFormTweet"
    label="Describe final form in 80 characters"
    placeholder="I love final form because..."
  />
);
myTextInput.parameters = {
  finalForm: {
    initialValues: {
      finalFormTweet: '',
    },
    validate: someSchema,
    onSubmit: v => console.log('I want to log these... ', v),
  },
};
```

## Mature Examples

In time, I will add more mature examples that show the usefulness of the subforms pattern on a larger scale. If anyone
has any good examples then please do submit them.
