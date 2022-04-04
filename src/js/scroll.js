(function () {
  const MyScrollBar = document.createElement('div');
  MyScrollBar.innerHTML = `
         <style>
              ::-webkit-scrollbar {
                  background-color: #304156;
                  width: 6px;
                  overflow: visible;
              }
              ::-webkit-scrollbar-thumb {
                  background-color: #2474b5;
                  border-radius: 0;
              }
              ::-webkit-scrollbar-button {
                  background-color: #2474b5;
                  width:0px;
                  height:0px;
              }
              ::-webkit-scrollbar-corner {
                  background-color: black;
              }

              .content::-webkit-scrollbar {
                background-color: #f3f4f4;
                height:6px;
                overflow: visible;
              }
              .content::-webkit-scrollbar-thumb {
                  background-color: #2474b5;
                  border-radius: 0;
              }
              .content::-webkit-scrollbar-button {
                  background-color: #2474b5;
                  width:0px;
                  height:0px;
              }
              .content::-webkit-scrollbar-corner {
                  background-color: black;
              }

              pre::-webkit-scrollbar {
                background-color: #f3f4f4;
                height:6px;
                overflow: visible;
              }
              pre::-webkit-scrollbar-thumb {
                  background-color: #2474b5;
                  border-radius: 0;
              }
              pre::-webkit-scrollbar-button {
                  background-color: #2474b5;
                  width:0px;
                  height:0px;
              }
              pre::-webkit-scrollbar-corner {
                  background-color: black;
              }
          </style>
       `;
  document.body.appendChild(MyScrollBar);
})(document);
