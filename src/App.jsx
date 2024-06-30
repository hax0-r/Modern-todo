import { useEffect, useState } from 'react';
import './App.css';
import DeleteBtn from './Components/DeleteBtn';
import { MyCollection, addDoc, getDocs, deleteDoc, doc } from './Components/Firebase';

function App() {
  const [value, setValue] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [time, settime] = useState("");
  const formHandler = async (e) => {
    e.preventDefault();
    const newTask = { task: value };
    setAllTask([...allTask, newTask]);
    const docRef = await addData(newTask);
    setValue("");
    newTask.id = docRef.id;
  }

  const addData = async (objToSend) => {
    const docRef = await addDoc(MyCollection, objToSend);
    return docRef;
  }

  const getData = async () => {
    let arr = [];
    const getAllData = await getDocs(MyCollection);
    getAllData.forEach((doc) => {
      arr.push({ task: doc.data().task, id: doc.id });
    });
    setAllTask([...arr]);
  }

  useEffect(() => {
    getData();

    // ---time
    setInterval(() => {
      let date = new Date().toLocaleTimeString();
      settime(date)
    }, 1000);
  }, []);

  const deleteHandler = async (index, firebaseId) => {
    const deleteItem = allTask.filter((_, id) => id !== index);
    setAllTask(deleteItem);

    const taskDoc = doc(MyCollection, firebaseId);
    await deleteDoc(taskDoc);
  }


  return (
    <>
      {/* ========backgorund========= */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

      {/* ========time======= */}

      <p className='absolute top-5 right-10 text-slate-400 text-sm '>{time}</p>

      <h1 className='text-center sm:text-3xl text-xl font-bold text-zinc-600 pt-[4.3rem] pb-7'>Add Your Daily Tasks</h1>
      <form onSubmit={formHandler} className='max-w-[75rem] m-auto px-10 '>
        <div className="relative">
          <input onChange={e => setValue(e.target.value)} value={value} type="text" id="search" className="block w-full p-4 sm:pr-32 pr-24 text-sm text-gray-900 border rounded-lg bg-[#ffffff86] focus:ring-blue-500 border-[#d5c5ff] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Your Task" required />
          <button type="submit" className="text-white absolute end-1 bottom-[.3rem] bg-[#743dff] hover:bg-[#5e1fff] focus:ring-4 transition-all focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:px-6 px-3 py-3 ">Add Task</button>
        </div>
      </form>
      <div className="max-w-[75rem] px-14 m-auto sm:pt-14 pt-9 pb-16 overflow-hidden">
        {
          allTask.length > 0 ? allTask.map((allData, index) => (
            <div className=" relative text-wrap glass" key={index}>
              {/* <p className='absolute top-1 text-sm text-slate-300'>{time}</p> */}
              <div className="flex relative justify-between items-center">
                <p className='task-text'>{allData.task}</p>
                <div className="ml-3">
                  <DeleteBtn deleteHandler={deleteHandler} index={index} firebaseId={allData.id} />
                </div>
              </div>
            </div>
          )) : <p className='text-center text-xl font-semibold text-slate-400 select-none'>No Task</p>
        }
      </div>
    </>
  );
}

export default App;
