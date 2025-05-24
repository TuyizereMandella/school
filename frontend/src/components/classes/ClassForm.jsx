import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const API_URL = '/api';

const ClassForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchClass();
    }
  }, [id]);

  const fetchClass = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      formik.setValues(response.data.data);
    } catch (err) {
      setError('Failed to fetch class');
    }
  };

  const formik = useFormik({
    initialValues: {
      className: '',
      description: ''
    },
    validationSchema: Yup.object({
      className: Yup.string()
        .required('Class name is required'),
      description: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const url = isEditMode
          ? `${API_URL}/classes/${id}`
          : `${API_URL}/classes`;
        
        const method = isEditMode ? 'put' : 'post';
        
        await axios[method](url, values, {
          headers: { Authorization: `Bearer ${token}` }
        });

        navigate('/classes');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to save class');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? 'Edit Class' : 'Add Class'}
      </h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="className" className="form-label">
            Class Name
          </label>
          <input
            id="className"
            type="text"
            className={`form-input ${
              formik.touched.className && formik.errors.className ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('className')}
          />
          {formik.touched.className && formik.errors.className && (
            <div className="form-error">{formik.errors.className}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className={`form-input ${
              formik.touched.description && formik.errors.description ? 'border-red-500' : ''
            }`}
            rows="4"
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="form-error">{formik.errors.description}</div>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner mx-auto" />
            ) : (
              isEditMode ? 'Update Class' : 'Add Class'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/classes')}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm; 