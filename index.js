const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const loginService = require('./controllers/loginController');
const userController = require('./controllers/userController');
const middleware = require('./middlewares/validations');

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userController);
app.use('/login', middleware.validateLogin, loginService);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
