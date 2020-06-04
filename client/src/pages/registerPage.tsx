import React from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import isEmail from 'validator/lib/isEmail';
import Button from '@/components/button';
import {Link} from 'react-router-dom'

import useAuth from '@/hooks/useAuthHook';

const init = {
   name: '',
   username: '',
   email: '',
   password: '',
};

const RegisterPage = () => {
   const {errors,register, handleSubmit} = useForm({defaultValues: init, mode:"onChange"})
   const { formSubmiting, onSubmit, isAuthenticated } = useAuth()
   if(isAuthenticated) return <Redirect to="/404"/>
   return (
      <div className='container mx-auto h-full w-full flex justify-center items-center flex-col'>
         <h3 className='capitalize py-4 text-3xl'>Create new account</h3>
         <form
            className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 md:w-11/12 w-9/12'
            style={{ maxWidth: '600px' }}
            onSubmit={handleSubmit(onSubmit('user/register'))}
         >
            <div className="flex flex-col relative">
              <label className='mb-2'>Name</label>
              <input className="p-3 rounded dark-light-bg shadow-sm input-focus"
                  name="name"
                  placeholder="Your Name..." 
                  autoFocus
                  ref={register({
                      required: "Name is required",
                      minLength: {value: 3, message: 'Name Too Short'},
                      validate: value => /^[a-z\s]*$/ig.test(value) || 'Name Only Contains Letters' 
              })}/>
             {errors.name && 
                  <p className="py-1 text-orange-400 capitalize">{errors.name.message}</p>}
           </div>
           <div className="flex flex-col relative">
              <label className='mb-2'>User Name</label>
              <input className="p-3 rounded dark-light-bg shadow-sm input-focus"
                  name="username"
                  placeholder="Your User Name..." 
                  ref={register({
                      required: "User Name is required",
                      minLength: {value: 4, message: 'username too short'},
                     validate: value => /^[a-z\d]*$/ig.test(value) || 'User Name Only Contains Letters and Numbers'
              })}/>
             {errors.username && 
                  <p className="py-1 text-orange-400 capitalize">{errors.username.message}</p>}
           </div>
           <div className="flex flex-col relative">
              <label className='mb-2'>Email</label>
              <input className="p-3 rounded dark-light-bg shadow-sm input-focus"
                  name="email"
                  placeholder="Your Email..." 
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
                  placeholder="Your Password..." 
                  ref={register({
                      required: "Password is required",
                      minLength: {value: 6, message: 'Password Too Short. Min 6'},
              })}/>
             {errors.password && 
                  <p className="py-1 text-orange-400 capitalize">{errors.password.message}</p>}
           </div>
           
            <div style={{ gridColumn: '1 / -1' }} className='text-center'>
               <Link to="/login" className="text-sm text-gray-500">I Already Have An account</Link>
               <br />
               <Button
                  className='w-24 h-10 rounded bg-green-500 shadow-md mt-2 input-focus'
                  loading={formSubmiting}
               >
                  Register
               </Button>
            </div>
         </form>
      </div>
   );
};

export default RegisterPage;
