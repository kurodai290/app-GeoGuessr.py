
const express=require('express');
const app=express();
app.get('/',(_,res)=>res.send('Chariguesser Server'));
app.listen(process.env.PORT||3000);
