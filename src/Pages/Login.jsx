import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState([]);
  const [user, setuser] = useState({ id: "", name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((response) => setData(response));

    fetchApi;
  }, []);

  const handleChange = (e) => {
    const selectedUser = data?.find((item) => item.name === e.target.value);
    if (selectedUser) {
      setuser({ id: selectedUser.id, name: selectedUser.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/todo");
  };

  return (
    <div className=" flex justify-center top-[30%] left-0 right-0 absolute">
      <div className=" border p-10 shadow-lg border-b-4 border-r-4 md:w-[600px] md:h-[300px] h-[300px] w-[300px]">
        <p className="font-bold text-2xl">Login</p>

        <form onSubmit={handleSubmit}>
          <select
            className=" w-full border mt-5 shadow-lg border-b-2 border-l-2"
            onChange={(e) => handleChange(e)}
          >
            <option>select user</option>

            {data &&
              data.map((item) => {
                return <option key={item.id}>{item.name}</option>;
              })}
          </select>

          <div className="border shadow-lg border-t-2 border-r-2 text-center py-2 bg-gray-200 focus-within:bg-white mt-10">
            <button type="submit">Get Started</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
