import {ChangeEvent, useState} from 'react';
import validator from 'validator';

const fields = {
  email: 'E-mail',
  password: 'Password',
};

type Field = {
  value: string;
  isValid: boolean;
}

type FormValues = {
  [key: string]: Field;
}

function LoginForm (): JSX.Element {
  const [formState, setFormState] = useState<FormValues>({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  });

  const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setFormState({...formState, [name]: {isValid: formState[name].isValid, value}});
  };

  return (
    <section className='login'>
      <h1 className='login__title'>Sign in</h1>
      <form className='login__form form' action='#' method='post'>
        {Object.entries(fields).map(([name, label]) => (
          <div key={name} className='login__input-wrapper form__input-wrapper'>
            <label className='visually-hidden' htmlFor={name}>{label}</label>
            <input
              className='login__input form__input'
              id={name}
              type={name}
              name={name}
              placeholder={label}
              value={formState[name].value}
              onChange={onFormChange}
            />
          </div>
        ))}
        <button className='login__submit form__submit button' type='submit'>Sign in</button>
      </form>
    </section>
  );
}

export default LoginForm;
