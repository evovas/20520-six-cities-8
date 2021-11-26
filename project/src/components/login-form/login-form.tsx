import {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import Loader from '../loader/loader';
import {FetchStatus} from '../../const';
import {loginAction} from '../../store/api-actions';
import {getAuthorizationRequestStatus} from '../../store/user/selectors';
import styles from './login-form.module.scss';

const fields = {
  email: 'E-mail',
  password: 'Password',
};

type Field = {
  value: string;
  error: boolean;
  touched: boolean;
  errorText: string;
  regex: RegExp,
}

type FormValues = {
  [key: string]: Field;
}

function LoginForm (): JSX.Element {
  const dispatch = useDispatch();
  const authorizationRequestStatus = useSelector(getAuthorizationRequestStatus);

  const [formState, setFormState] = useState<FormValues>({
    email: {
      value: '',
      error: false,
      touched: false,
      errorText: 'Please, enter a valid E-mail address',
      regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      value: '',
      error: false,
      touched: false,
      errorText: 'Minimum 1 uppercase, 1 lowercase letter and 1 number',
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/,
    },
  });

  const handleFormChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    const rule = formState[name].regex;
    const isValid = rule.test(value);

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        error: !isValid,
        value,
        touched: true,
      },
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction({
      email: formState.email.value,
      password: formState.password.value,
    }));
  };

  return (
    <section className='login' data-testid='login-form'>
      <h1 className='login__title'>Sign in</h1>
      <form className='login__form form' action='#' method='post' onSubmit={handleSubmit}>
        {Object.entries(fields).map(([name, label]) => {
          const inputCls = cn('login__input', 'form__input',  {[styles.loginInputError]: formState[name].error && formState[name].touched});

          return (
            <div key={name} className={cn(styles.loginInputWrapper, 'login__input-wrapper', 'form__input-wrapper')}>
              <label className='visually-hidden' htmlFor={name}>{label}</label>

              <input
                className={inputCls}
                id={name}
                type={name}
                name={name}
                placeholder={label}
                value={formState[name].value}
                onChange={handleFormChange}
              />

              {formState[name].error && formState[name].touched && (
                <p className={styles.loginInputErrorMessage}>{formState[name].errorText}</p>
              )}
            </div>
          );
        })}
        <button
          className='login__submit form__submit button'
          type='submit'
          disabled={
            formState.email.error
            || formState.password.error
            || !formState.email.touched
            || !formState.password.touched
          }
        >
          {authorizationRequestStatus === FetchStatus.Loading ? <Loader size={10} isLoginScreen /> : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
