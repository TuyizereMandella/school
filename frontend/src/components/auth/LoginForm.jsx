import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        const result = await login(values.email, values.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('An error occurred during login');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="form-error">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-input ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="form-error">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner mx-auto" />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 