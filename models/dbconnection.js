import { MongoClient } from 'mongodb';
var url = "mongodb://127.0.0.1:27017/cutshort_test";

const client = new MongoClient(url);
await client.connect().then((res)=>{
    console.log('client connected successfully!')
}).catch(er=>{
    console.log('error is', er.message);
})

