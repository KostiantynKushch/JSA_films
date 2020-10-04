import {useState} from "react";

const useFormHandler = initialData => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setData({...data, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  };

  const validate = data => {
    const errors = {};

    for (const key in initialData) {
      if (initialData.hasOwnProperty(key)) {
        switch (key) {
          case "email":
            if (!data.email) errors.email = "Email is required";
            break;
          case "password":
            if (!data.password) errors.password = "Password is required";
            break;
          case "confirm_password":
            if (!data.confirm_password)
              errors.confirm_password = "Confirm Password is required";
            if (data.password !== data.confirm_password)
              errors.confirm_password = "Passwords should be equal";
            break;

          default:
            break;
        }
      }
    }
    return errors;
  };

  return [data, handleInput, errors, setErrors, validate];
};

export default useFormHandler;
