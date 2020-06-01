import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

import { ErrroObj } from '@/hooks/useFormHook';

export interface WithPassword {
    // confirmPassword?: string;
    password?: string;
}

interface FormDataI extends WithPassword {
    name?: string;
    email?: string;
    username?: string;
}

const setError = (status: boolean, message: string): ErrroObj => {
    return { status, message, touched: true };
};

export const validate = (name: string, formData: FormDataI): ErrroObj => {
    // @ts-ignore
    if (isEmpty(formData[name] || ''))
        return setError(true, `${name} field is required`);
    if (name === 'email' && !isEmail(formData.email || '')) {
        console.log(isEmail(formData.email || ''))
        return setError(true, 'Email address is invalid');
    }
    if (
        name === 'name' &&
        !isLength(formData.name || '', { min: 3, max: 15 })
    ) {
        return setError(true, 'Name field must be 3 to 15 charates');
    }
    if (name === 'username') {
        if (!isLength(formData.username || '', { min: 3, max: 15 }))
            return setError(true, 'User Name field must be 3 to 15 charates');
        if (!isAlphanumeric(formData.username || ''))
            return setError(true, 'User Name Must Contains Letter and Number');
    }
    if (name === 'password' && !isLength(formData.password || '', { min: 6 })) {
        return setError(true, 'Password must atlest 6 charaters long');
    }

    // if (
    //     name === 'confirmPassword' &&
    //     formData.password !== formData.confirmPassword
    // ) {
    //     return setError(true, 'Password Does not match');
    // }
    return setError(false, '');
};
