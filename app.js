const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images',express.static('images'));
/*
Now, the reason for this working now is simply that if you add such a filter here, like in this case where I'm filtering for requests that start with "slash" images, then the path for which you are filtering, so "slash" images here, is removed from the incoming request path. So if originally the browser is sent the request for "slash" images "slash" max JPEG. Now it's just four "slash" max JPEG without "slash" images.
*/

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
