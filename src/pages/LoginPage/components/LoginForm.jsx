import React from "react";
import FormMessage from "components/FormMessage";
import useFormHandler from "hooks/useFormHandler";

const initialData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [data, handleInput, errors, setErrors, validate] = useFormHandler(
    initialData,
  );

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) console.log(data);
  };

  const handleCancel = () => {};

  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className={`field ${errors.email ? "error" : ""}`}>
        <label>Email</label>
        <input
          onChange={handleInput}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>
      <div className={`field ${errors.password ? "error" : ""}`}>
        <label>Password</label>
        <input
          onChange={handleInput}
          type="password"
          name="password"
          placeholder="Password"
        />
        {errors.password && <FormMessage>{errors.password}</FormMessage>}
      </div>

      <button className="ui button green mr-3" type="submit">
        OK
      </button>
      <span onClick={handleCancel} className="ui button">
        Cancel
      </span>
    </form>
  );
};

export default LoginForm;
