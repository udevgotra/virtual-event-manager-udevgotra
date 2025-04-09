const express = require('express');
const routersUser = require('./src/routers/users');
const routersEvent = require('./src/routers/events');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', routersUser);
app.use('/events', routersEvent);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;
