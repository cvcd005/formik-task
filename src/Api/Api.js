import axios from "axios";

export const obj = { 
Name: "vasay",
Password: "pupkin123T",
PasswordConfirmation: "pupkin123T",
Email: "asdf@mail.ru",
Website: "",
Age: 19,
Skills: [""],
AcceptedTerms: true,
}

const test = async (user) => {
  const response = await axios.post("http://localhost:5000/sign-up", user);
  return response;
  
  /*try {
    const response = await axios.post("http://localhost:5000/sign-up", obj);
    console.log(response.data);
  }
  catch (error) {
    console.log('user exist');
  }*/
};

export default test;


/*axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});*/