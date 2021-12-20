# The Project allows writing javascript code, execute it and add documentation using markdown  

- Click in any text or code editor cell to edit it
- The code in each code editor is all joined into one file. If you define a variable in upper editor, you can refer to it in any following code editors
- You can show any React component calling **render** function. This function is build into environment.
- You can reorder, add or delete text and code editor cells using the buttons on the top right

All of your changes get saved to file you opened with. So if you ran 

```bash
npx @pnp-js/cli serve myNotebook.js
```
all of the code and text will save to file **myNotebook.js** file.  
- You can run it with default settings
    - **filename**=notebook.js
    - **--port,-p**=3003
```bash
npx @pnp-js/cli serve
```


