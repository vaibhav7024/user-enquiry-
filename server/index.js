
let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
const enquiryRouter = require('./App/routes/web/enquiryRoute');
require('dotenv').config();

let app = express();
app.use(cors());
app.use(express.json());

// routes 
app.use('/api/website/enquiry',enquiryRouter);

// connect mongoose 
mongoose.connect(process.env.DBURL).then(() =>{
    console.log('Connected to MongeDB');
    app.listen(process.env.PORT || 3000, () =>{
        console.log('Server is running ');
    })
}).catch((err)=>{console.log(err)});


