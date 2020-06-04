import React from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import isEmail from 'validator/lib/isEmail';
import Button from '@/components/button';
import { Link } from 'react-router-dom'

import useAuth from '@/hooks/useAuthHook';

const init = { email: '', password: '' };

const LoginPage = () => {
    const {errors,register, handleSubmit} = useForm({defaultValues: init, mode:"onChange"})
    const { formSubmiting, onSubmit, isAuthenticated } = useAuth()
    if(isAuthenticated) return <Redirect to="/404"/>
    return (
        <div className='container mx-auto h-full w-full flex justify-center items-center flex-col'>
            <h3 className='capitalize my-6 md:my-8 text-2xl md:text-3xl'>Login Your Account</h3>
            <form
                className='grid grid-cols-1 mx-auto gap-4 w-9/12'
                style={{ maxWidth: '400px' }}
                onSubmit={handleSubmit(onSubmit('user/login'))}
            >
                <div className="flex flex-col relative">
                    <label className='mb-2'>Email</label>
                    <input className="p-3 rounded dark-light-bg shadow-sm input-focus"
                        name="email"
                        placeholder="Your Email..." 
                        autoFocus
                        ref={register({
                            required: "Email is required",
                            validate: value => isEmail(value) || 'invalid email address'
                    })}/>
                   {errors.email && 
                        <p className="py-1 text-orange-400 capitalize">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col relative">
                    <label className='mb-2'>Password</label>
                    <input className="p-3 rounded dark-light-bg shadow-sm input-focus" 
                        name="password"
                        type="password" placeholder="Your Password..." 
                        ref={register({
                            required: "Password Is Required",
                            minLength:{value: 6, message: 'Password Too Short. Min 6'}
                        })}/>
                    {errors.password && 
                        <p className="py-1 text-orange-400 capitalize">{errors.password.message}</p>}
                </div>
                
                 <div style={{ gridColumn: '1 / -1' }} className='text-center'>
                <Link to="/register" className="text-sm text-gray-500">I Don't Have An account</Link>
                <br />
                    <Button
                         className='w-24 h-10 rounded bg-green-500 shadow-md mt-2'
                        loading={formSubmiting}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
