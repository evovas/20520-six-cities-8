import {ChangeEvent, useState} from 'react';
import validator from 'validator';
import cn from 'classnames';
import styles from './login-form.module.scss';

const PASSWORD_VALIDATION_SETTING = {
  returnScore: false,
  minLength: 3,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

const fields = {
  email: 'E-mail',
  password: 'Password',
};

const errorMessages: { [key: string]: string } = {
  email: 'Please, enter a valid E-mail address',
  password: 'Minimum 1 uppercase, 1 lowercase letter and 1 number',
};

type Field = {
  value: string;
  isValid: boolean;
  isDefault: boolean;
}

type FormValues = {
  [key: string]: Field;
}

function LoginForm (): JSX.Element {
  const [formState, setFormState] = useState<FormValues>({
    email: {
      value: '',
      isValid: true,
      isDefault: true,
    },
    password: {
      value: '',
      isValid: true,
      isDefault: true,
    },
  });

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    const name = target.name;
    const value = validator.trim(target.value);
    let isValid: boolean;
    switch (name) {
      case 'email':
        isValid = validator.isEmail(value);
        break;
      case 'password':
        isValid = validator.isStrongPassword(value, PASSWORD_VALIDATION_SETTING);
        break;
      default:
        throw new Error('Unknown login input field');
    }
    setFormState({...formState, [name]: {isValid, value, isDefault: false}});
  };

  return (
    <section className='login'>
      <h1 className='login__title'>Sign in</h1>
      <form className='login__form form' action='#' method='post'>
        {Object.entries(fields).map(([name, label]) => (
          <div key={name} className={cn(styles.loginInputWrapper, 'login__input-wrapper', 'form__input-wrapper')}>
            <label className='visually-hidden' htmlFor={name}>{label}</label>
            {!formState[name].isValid ? <p className={styles.loginInputErrorMessage}>{errorMessages[name]}</p> : ''}
            <input
              className={cn('login__input', 'form__input', !formState[name].isValid ? styles.loginInputError : '')}
              id={name}
              type={name}
              name={name}
              placeholder={label}
              value={formState[name].value}
              onChange={onFormChange}
            />
          </div>
        ))}
        <button
          className='login__submit form__submit button'
          type='submit'
          disabled={
            !formState.email.isValid
            || !formState.password.isValid
            || formState.email.isDefault
            || formState.password.isDefault
          }
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
