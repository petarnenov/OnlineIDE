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

## Example  
 - Add code editor cell <+ Code>  
 - Copy/Paste  
```javascript
import { useState, useMemo, useRef } from 'react';

const Input = ({ label, input, button }) => {
  const inputRef = useRef();
  return (
    <>
      <label htmlFor="input-title">{label.textContent}</label>
      <input
        ref={inputRef}
        id="input-title"
        type="text"
        placeholder={input.placeholder}
      />
      <button
        onClick={() => {
          button.onClick(inputRef.current.value);
          inputRef.current.value = '';
        }}
      >
        {button.textContent}
      </button>
    </>
  );
};

const Books = ({ titles }) => {
  const books = titles.map((book, index) => (
    <li key={book}>
      {index + 1}.{book}
    </li>
  ));

  return <ul>{books}</ul>;
};

const BookForm = () => {
  const [titles, setTitles] = useState([]);
  const props = useMemo(
    () => ({
      label: {
        textContent: 'Title',
      },
      input: {
        placeholder: 'enter title',
      },
      button: {
        textContent: 'Add Book',
        onClick: (title) => setTitles((prev) => [...prev, title]),
      },
    }),
    []
  );

  return (
    <>
      <h2>Book Form</h2>
      <Input {...props} />
      <Books titles={titles} />
    </>
  );
};

render(
  <>
    <BookForm />
  </>
);
```


