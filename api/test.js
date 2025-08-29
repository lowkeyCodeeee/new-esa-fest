

export default function test(req, res) {
    if(req.method === 'GET'){
        res.status(200).json({status : 'ok', message : 'hello world'});
    }
    res.status(400).json({message : 'Bad Request from test'});
}