

const uri = process.env.MONGO_CONNECTION_STRING;


export default function test(req, res) {
    if(req.method === 'GET'){
        res.status(200).json({status : 'ok', message : 'hello world', uri});
    }
    res.status(400).json({message : 'Bad Request from test'});
}