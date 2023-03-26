import { MongoClient } from 'mongodb';
var url = "mongodb://127.0.0.1:27017/cutshort_test";

const client = new MongoClient(url);

export async function dbConnect() {
    await client.connect();
    
    var dbo = client.db('cutshort_test');
    return dbo;
}
