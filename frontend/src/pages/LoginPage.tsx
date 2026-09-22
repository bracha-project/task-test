import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../types/auth';
import { login } from '../services/authService';
import { loginValidationSchema } from './loginValidation';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.scss';

function LoginPage() {
    const navigate = useNavigate();
    const { login: saveAuth } = useAuth();
    const [apiError, setApiError] = useState('');

  const initialValues: LoginRequest = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: LoginRequest) => {
    try {
      setApiError('');
      const authResponse = await login(values);
      saveAuth(authResponse);
     navigate('/tasks');
    } catch {
        setApiError('Username or password is incorrect');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Task Manager</h1>

        <p className="login-subtitle">
          Sign in to manage your tasks
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="login-field">
                <label htmlFor="username">
                  Username
                </label>

                <Field
                  id="username"
                  name="username"
                  type="text"
                />

                <ErrorMessage
                  name="username"
                  component="div"
                  className="login-error"
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">
                  Password
                </label>

                <Field
                  id="password"
                  name="password"
                  type="password"
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="login-error"
                />
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              {apiError && (
                <div className="login-api-error">
                    {apiError}
                </div>
                )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;