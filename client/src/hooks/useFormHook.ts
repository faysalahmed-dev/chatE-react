import { useState, ChangeEvent, FocusEvent } from 'react';
import _ from 'lodash';
import { validate, WithPassword } from '@/validator/validator';

export interface ErrroObj {
    status: boolean;
    message: string;
    touched: boolean;
}

export type ErrorI<T> = {
    readonly [key in keyof T]: ErrroObj;
};

interface UseForm<T> {
    values: T;
    errors: ErrorI<T>;
    hasError: boolean;
    handleSubmit(
        callBack: (data: T) => any
    ): (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange(e: ChangeEvent<HTMLInputElement>): void;
    handleBlur(e: FocusEvent<HTMLInputElement>): void;
}

const useCustomForm = <T extends WithPassword>(
    initialValues: T
): UseForm<T> => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(
        Object.keys(initialValues).reduce((acc, val) => {
            // @ts-ignore
            acc[val] = { status: false, message: '', touched: false };
            return acc;
        }, {} as ErrorI<T>)
    );

    const hasError = _.some(errors, err => err.status || !err.touched);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;
        event.persist();
        setValues({ ...values, [name]: value });
        setErrors({
            ...errors,
            [name]: validate(name, values),
        });
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const {
            target: { name },
        } = event;

        setErrors({ ...errors, [name]: validate(name, values) });
    };

    const handleSubmit = (callBack: (data: T) => any) => (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        console.log('call');
        e.preventDefault();
        if (callBack && typeof callBack === 'function' && !hasError)
            callBack(values);
    };

    return {
        values,
        hasError,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};

export default useCustomForm;
