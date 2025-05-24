import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const API_URL = '/api';

const StudentForm = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    fetchClasses();
    if (isEditMode) {
      fetchStudent();
    }
  }, [id]);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(response.data.data);
    } catch (err) {
      setError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      formik.setValues(response.data.data);
    } catch (err) {
      setError('Failed to fetch student');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      classId: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      age: Yup.number()
        .min(5, 'Age must be at least 5')
        .max(100, 'Age cannot be more than 100')
        .required('Age is required'),
      classId: Yup.string()
        .required('Class is required')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const url = isEditMode
          ? `${API_URL}/students/${id}`
          : `${API_URL}/students`;
        
        const method = isEditMode ? 'put' : 'post';
        
        await axios[method](url, values, {
          headers: { Authorization: `Bearer ${token}` }
        });

        navigate('/students');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to save student');
      } finally {
        setLoading(false);
      }
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? 'Edit Student' : 'Add Student'}
      </h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="form-error">{formik.errors.name}</div>
          )}
        </div>

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
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            className={`form-input ${
              formik.touched.age && formik.errors.age ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('age')}
          />
          {formik.touched.age && formik.errors.age && (
            <div className="form-error">{formik.errors.age}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="classId" className="form-label">
            Class
          </label>
          <select
            id="classId"
            className={`form-input ${
              formik.touched.classId && formik.errors.classId ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('classId')}
          >
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.className}
              </option>
            ))}
          </select>
          {formik.touched.classId && formik.errors.classId && (
            <div className="form-error">{formik.errors.classId}</div>
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
              isEditMode ? 'Update Student' : 'Add Student'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm; 