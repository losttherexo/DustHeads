import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

function LandingForm() {
    const formSchema = yup.object().shape({
    username: yup.string().required('Username Required'),
    email: yup.string().email('Invalid email'),
    password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  })

  return (
    <Formik
        initialValues={{ 
            username:'',
            email:'',
            password:'',
        }}
      validate={ formSchema }
      onSubmit={(values) => {
        }
      }}
    
        <Form>
            <label htmlFor='username' className='block mb-2 font-medium'>Username</label>
            <Field type='text' name='username' className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <ErrorMessage name='username' />
            <label htmlFor='password' className='block mb-2 font-medium'>Password</label>
            <Field type='password' name='password' className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <ErrorMessage name='password' />
            <button type='submit' className='w-2/3 px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
              Log In
            </button>
          {/* <label htmlFor="email">Email Address</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" />

          {status && <div className="error">{status}</div>}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
        </Form>
      )}
    </Formik>
  );
}

export default LandingForm