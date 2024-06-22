const express = require('express');
const { title, type, formproperty } = require("./form")
const cors = require('cors');
const app = express();
app.use(cors());
const route=require('./route/form');
app.use("/form",route);





const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});