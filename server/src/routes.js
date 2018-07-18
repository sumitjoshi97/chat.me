const moment = require('moment');
export const START_TIME = new Date();
module.exports = (app) => {
    app.get('/', (req, res) => {
        return res.json({
            started: moment(START_TIME).fromNow()
        })
    })

    app.post('/api/users', (req, res) => {
        const body = req.body;
        
        return res.status(200).json(body)
    })

}