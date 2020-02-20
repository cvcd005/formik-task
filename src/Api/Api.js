import axios from "axios";

const sendForm = async user => {
  const response = await axios.post("http://localhost:5000/sign-up", user);
  return response;
};

const submit = async (values, { setSubmitting, resetForm, setFieldError }) => {
  try {
    await sendForm(values);
    resetForm();
    setSubmitting(false);
  } catch (error) {
    if (error.response) {
      setFieldError("email", "User with same email is already exist");
    } else {
      resetForm();
      setSubmitting(false);
    }
  }
};

export default submit;
