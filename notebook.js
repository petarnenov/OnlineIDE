[{"id":"lzyx9","content":"### Project allow writing javascript code, execute it and add documentation using markdown  \n\n- Click in any text or editor cell to edit it\n- The code in each code editor is all joined into one file. If you define a variable in cell upper cell, you can refer to it in any following code cell\n- You can show any React component calling **render** function. This function is build into environment.\n- You can reorder, add or delete text and code cells using the buttons on the top right\n\nAll of your changes get saved to file you opened with. So if you ran \n\n```bash\nnpx @pnp-js/cli serve myNotebook.js\n```\nall of the code and text will save to file **myNotebook.js** file.","type":"text"},{"id":"76uz1","content":"import {useState} from \"react\"\n\nconst Counter = () => {\n  const [counter,setCounter] = useState(0)\n  const increaseHandler = ()=>{\n    setCounter((state)=>state+1)\n  }\n  const resetHandler = ()=>setCounter(0)\n  return (\n    <>\n      <div>{counter}</div>\n      <button onClick={increaseHandler}>Increase</button>\n      <button onClick={resetHandler}>Reset</button>\n    </>\n  )\n}\n\nrender(<Counter />)","type":"code"},{"id":"dlbjw","content":"You can use *Counter* in next code editor, like this:","type":"text"},{"id":"eokt6","content":"render(\n  <>\n    <Counter />\n    <Counter />\n  </>\n)","type":"code"}]