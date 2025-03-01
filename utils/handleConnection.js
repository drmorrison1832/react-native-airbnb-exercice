import axios from "axios";

export default async function handleConnection() {
  console.log("handleConnection...");

  let newErrorFields = [];
  setErrorMessage("");
  console.log("ok");

  switch (true) {
    case !email:
      newErrorFields.push("email");
    case !password:
      newErrorFields.push("password");
    default:
      if (newErrorFields.length > 0) {
        setErrorFields(newErrorFields);
        setErrorMessage("Please fill all fields");
        return;
      }
  }

  setIsLoading(true);

  const body = {
    email,
    password,
  };

  try {
    let response = await axios.post(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
      body
    );

    login(response.data);

    setIsLoading(false);
    setErrorFields([]);
    setErrorMessage("");
  } catch (error) {
    console.error(error.message);
    switch (error?.status) {
      case 400:
        setErrorFields(["email", "password"]);
        setErrorMessage("Wrong email or password");
        break;
      default:
        setErrorFields([]);
        setErrorMessage("Something went wrong");
        break;
    }

    setIsLoading(false);
    return;
  }
}
