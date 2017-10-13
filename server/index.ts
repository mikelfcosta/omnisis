/// <reference types="node" />
import App from './App';

const PORT = 3000;

App.listen(PORT, (err: Error) => {
  if (err) return console.error(err);
  console.log(`Server opened at port ${PORT}`);
});
