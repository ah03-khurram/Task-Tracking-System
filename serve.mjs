import app from './app.mjs'
/**
 * The port number on which the server will listen.
 * @constant {number}
 */
const port = 3000;

app.listen(port, () => {
  console.log('App listening at http://localhost:%d', port);
});

export default app