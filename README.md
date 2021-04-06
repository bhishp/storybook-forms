# storybook-forms

Monorepo of storybook decorators that allow you to use components in your stories that rely on a Form state-management library.

This Repo consists of three packages:

- [storybook-forms-core](/packages/storybook-forms-core) - a core package used by specific storybook form addons
- [storybook-formik](/packages/storybook-formik) - a storybook addon for formik
- [storybook-final-form](/packages/storybook-final-form) - a storybook addon for final form

### Misc notes/gotchyas

**Only one decorator can be included at a time**. Currently, the core package sets the storybook panel data (such as PANEL_ID), and channel IDs too
This means that you cannot include two types of the decorator within the same storybook configuration at the same time. 

**The Formik interface is prioritised when it comes to similarly-named symbols**. The Formik addon was the first one created,
therefore, this project has a stronger influence from that library. This means that the core Panel expects to map to
`isValidating` (formik) rather than `validating` (final-form).
