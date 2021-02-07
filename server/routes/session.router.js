const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route to grab information about the session at load
router.get('/:time', (req, res)=>{
    const time = [req.params.time];
    const queryText = `
        SELECT "id", "start_time_hour", "start_time_minute" from "event"
        WHERE (("start_time_hour" * 3600000) + ("start_time_minute" * 60000)) >= $1
        ORDER BY "start_time_hour" ASC LIMIT 1;
    `
    pool.query(queryText, time).then((response)=>{
        console.log(response)
        res.send(response.rows);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })

})

// GET route to grab the event duration, number sitting, and koan
router.get('/sitting/:id', (req, res)=>{
    const id = req.params.id
    console.log('in /user route');
    const queryText = `
        SELECT "duration", "attended", "koan" FROM "event"
        WHERE "event".id = $1;
    `
    pool.query(queryText, [id]).then((response)=>{
        console.log(response)
        res.send(response.rows);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })

})

router.get('/portal/:time', (req, res)=>{
    const time = [req.params.time];
    const queryText = `
        SELECT "id", "start_time_hour", "start_time_minute", "duration", "koan" from "event"
        WHERE (("start_time_hour" * 3600000) + ("start_time_minute" * 60000)) >= $1
        ORDER BY "start_time_hour" ASC LIMIT 3;
    `
    pool.query(queryText, time).then((response)=>{
        console.log(response);
        res.send(response.rows);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500)
    })
})


module.exports = router;
