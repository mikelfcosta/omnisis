/// <reference types="node" />
import app from './app';

const port = 8080;

app.listen(port, (err: Error) => {
  if (err) return console.error(err);
  console.log(`Server opened at port ${port}`);
});