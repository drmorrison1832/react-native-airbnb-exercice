import axios from "axios";

export default async function handleConnection({
  setIsLoading,
  email,
  password,
}) {
  console.log("handleConnection...");
  setIsLoading(true);
  let user = null;

  const body = {
    email,
    password,
  };

  // console.log("ICI");
  try {
    console.log("try...");
    let response = await axios.post(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
      body
    );
    console.log(response.data);
    setUsername(response.data.username);
    setToken(response.data.token);
    alert(`connected as ${response.data.username}`);
    setIsLoading(false);
    setErrorFields([]);
    setErrorMessage("");
  } catch (error) {
    console.log("catch...");
    console.error(error);
    switch (error?.status) {
      case 400:
        setErrorFields([]);
        setErrorMessage("Wrong email or password");
        break;
      default:
        setErrorFields([]);
        setErrorMessage("Something went wrong");
        break;
    }

    console.log("end...");
    setIsLoading(false);
    return;
  }
}
