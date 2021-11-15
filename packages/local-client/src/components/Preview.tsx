import React, { useEffect, useRef } from 'react';
import './preview.css';

const html = `
 <html>
    <head>
      <style>
        html {
          background-color: white;         
        }
      </style>
    </head>
      <body style="color: black">
        <div id="root"></div>
        <script>
        const handleError = (err) => {
           const root = document.querySelector("#root")
              root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>'+err+'</div>'
              console.error(err)
        }
          window.addEventListener("error",(event)=>{
             event.preventDefault()
             handleError(event.error)
           })
          window.addEventListener("message",(event)=>{                     
            try{
              // console.log("event message: ",event)
              const code = event.data
              eval(code)
            }catch(err){
              handleError(err)
            }
          },false)
        </script>
      </body>
 </html>
  `;

interface PreviewProps {
  code: string;
  version: number;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, version, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcDoc = html;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, '*');
    }, 50);
  }, [code, version, err]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="iframe-wrapper"
        title="code preview"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
