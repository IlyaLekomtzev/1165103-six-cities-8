import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

const PASSWORD_VALIDATE_ERROR_MESSAGE = 'Пароль должен содержать минимум одну букву и цифру.';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
      dispatch(loginAction({ email, password }));
    } else {
      toast.info(PASSWORD_VALIDATE_ERROR_MESSAGE);
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="/" method="post" onSubmit={handleFormSubmit}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default LoginForm;
