// components/contactus.tsx

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
//import { toast } from 'react-hot-toast';

type FormInput = {
  name: string;
  email: string;
  message: string;
};

export default function Mail() {
  const [data, setData] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInput>();

  /**
  * The function sends a POST request to a server with form data and displays a success notification.
  * @param {FormInput} formData - The formData parameter is an object that contains the input values
  * from the form.
  */
  async function onSubmit(formData: FormInput) {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        from: "sales@photonest.io",
        ty: "from_us",
      })
    });

    if (!response.ok) {
      const data2 = await response.json();
      setData(JSON.stringify(data2));
    }
    else {
      setData('Your email message has been sent successfully');
    }

    reset();
  }

  return (
    <div className='flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)} // updated code
        className='mb-10 mt-5 flex w-full flex-col rounded-md bg-white p-5 py-14 shadow-lg md:max-w-3xl md:px-10 mx-auto'
      >
        <input
          className='mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0'
          type='text'
          placeholder='subject'
          required
          {...register('name')}
        />
        <input
          className='mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0'
          type='email'
          placeholder='mailto'
          required
          {...register('email')}
        />
        <textarea
          className='mt-4 mb-5 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0'
          placeholder='reply'
          rows={6}
          required
          {...register('message')}
        />

        <button
          disabled={isSubmitting}
          type='submit'
          className='bg-blue-700 px-6 py-3 disabled:bg-gray-500 block-primary rounded-md cursor-pointer text-white mt-4 font-bold'
        >
          Send
        </button><div className='bg-blue-700 px-6 py-3 disabled:bg-gray-500 block-primary rounded-md cursor-pointer text-white mt-4 font-bold'>{data}</div>
      </form>  
    </div>

  );
}