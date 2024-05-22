import { useEffect, useState } from "react";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(null);
  const [countWork, setCountWork] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // Timer set for 15 seconds

  useEffect(() => {
    // get loggedIn User data
    const loggedInUser = localStorage.getItem("loggedInUser");

    const fetchTodo = fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => {
        // return the data which has same id as loggedIn user id
        const data = res.filter(
          (item) => item?.userId === JSON.parse(loggedInUser).id
        );
        setTodos(data);
      });

    fetchTodo;
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "All") {
      setFilter(null);
    } else if (value === "Completed") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  // filter tasks
  const data = todos?.filter((item) => item.completed === filter);

  // count and break after every 2 task
  const handlecountWork = () => {
    setCountWork((prev) => prev + 1);

    if (countWork % 2 === 0 && countWork !== 0) {
      alert("Take a 10 second break");
    }
  };

  // start timer for 15 sec
  const handleStartTimer = () => {
    if (!timer) {
      const newTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(newTimer);
            alert("Take a 5 second break");
            setTimer(null);
            return 15; // Reset the timer
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(newTimer);
    }
  };

  const handleStopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
      setTimeLeft(15); // Reset the timer
    }
  };

  return (
    <div>
      <div className="absolute top-[5%] left-0 right-0">
        <div className="grid grid-cols-2">
          <div className="mt-10 text-3xl md:text-center ml-10 text-start font-bold">
            Todo
          </div>
          <div className="text-center">
            <select
              className="border w-32 mr-4 md:mr-0 p-2 shadow-lg border-b-2 border-r-2 mb-3"
              onChange={(e) => handleChange(e)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Incomplete</option>
            </select>
            <button
              className="ml-5 border shadow-lg border-b-2 p-2 border-r-2"
              onClick={handleStartTimer}
            >
              {timer ? `Time Left: ${timeLeft}s` : "Start Timer"}
            </button>
            <button
              className={`ml-5 border shadow-lg border-b-2 p-2 border-r-2 ${
                timer === null && " bg-slate-300"
              }`}
              onClick={handleStopTimer}
              disabled={timer === null} // Disable if timer is not running
            >
              Reset Timer
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {filter !== null ? (
            // filter tasks
            <div className="border m-5 w-[920px]">
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex">
                      <div className="mt-6 mx-4 h-14">
                        {item.completed ? (
                          <IoCheckmarkDoneSharp size={20} />
                        ) : (
                          <AiTwotoneExclamationCircle size={20} />
                        )}
                      </div>
                      <div className=" grid md:grid-cols-3 grid-cols-1">
                        <div className="mt-5 md:w-[25rem]">{item.title}</div>
                        <div className=" mt-5 text-end mx-3">May 22, 2024</div>
                        <div className=" flex justify-center">
                          <button
                            className="border shadow-lg border-b-2 px-10 h-10 mt-4 border-r-2"
                            onClick={handlecountWork}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // all tasks
            <div className="border m-5 w-[920px]">
              {todos.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex">
                      <div className="mt-6 mx-4 h-14">
                        {item.completed ? (
                          <IoCheckmarkDoneSharp size={20} />
                        ) : (
                          <AiTwotoneExclamationCircle size={20} />
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 grid-cols-1">
                        <div className="mt-5 md:w-[25rem]">{item.title}</div>
                        <div className=" mt-5 text-end mx-3">May 22, 2024</div>
                        <div className=" flex justify-center">
                          <button
                            className="border shadow-lg border-b-2 px-10 h-10 mt-5 border-r-2"
                            onClick={handlecountWork}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
