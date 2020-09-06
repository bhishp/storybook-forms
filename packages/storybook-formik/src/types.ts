import { FormikConfig } from 'formik';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ConfigWithoutSubmit<Values = any> = PartialBy<
  FormikConfig<Values>,
  'onSubmit'
>;

export const PARAMETER_NAME = 'formik';

export interface DecoratorParams<Values extends any = any> {
  [PARAMETER_NAME]?: ConfigWithoutSubmit<Values>;
}
