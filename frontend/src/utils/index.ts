import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

type SetFieldError = (field: string, message: string) => void;

export const notifyError = (
  error: AxiosError,
  setFieldError?: SetFieldError,
  fieldMap: Record<string, string> = {},
): void => {
  if ('request' in error && error?.request?.response) {
    const { response } = error.request;
    const parsedResponse = JSON.parse(response);

    Reflect.ownKeys(parsedResponse).forEach((field) => {
      if (field === 'non_field_errors') {
        toast.error(parsedResponse[field][0]);
      } else if (field === 'detail') {
        toast.error(parsedResponse[field]);
      } else if (typeof field === 'string' && setFieldError) {
        const fieldName = fieldMap[field] || field;
        setFieldError(fieldName, parsedResponse[field]);
      }
    });
  } else {
    toast.error(error);
  }
};
