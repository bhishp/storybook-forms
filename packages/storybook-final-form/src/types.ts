import { FormProps } from 'react-final-form';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type FinalFormPropsWithoutSubmit<Values = any> = PartialBy<
  FormProps<Values>,
  'onSubmit'
>;

export const PARAMETER_NAME = 'finalForm';

export interface DecoratorParams<Values extends any = any> {
  [PARAMETER_NAME]?: FinalFormPropsWithoutSubmit<Values>;
}
