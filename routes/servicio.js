const router = require('express').Router()
const path = require('path')
const fetch = require('node-fetch');
const { response } = require('express');


router.route('/').get((req, res) => {
    //debe abrir de manera estatica el html index
    res.sendFile(path.join(__dirname+'../../html/index.html'));
  })

//instancia el metodo post donde en el req.body.sendText
//recibe la cadena a evaluar
router.route('/').post((req, res)=>{
    let textAnalyze = req.body.sendText
    
    fetch('https://cloud-ibm-cf.us-south.cf.appdomain.cloud/servicio', {
        method: 'post',
        body:    JSON.stringify({sendText: textAnalyze}),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(response => {
        let insertHtml = `<h1>Tone Analysis </h1>`;

        response.tones.forEach(element => {
            insertHtml += `        
            <p><b>TONE_ID: </b> ${element.tone_id}</p>
            <p><b>SCORE: </b> ${element.score}</p>
            <p><b>TONE_NAME: </b>${element.tone_name}</p>
            <br></br>
            `
        });

        res.send(insertHtml);
    }
        
    );
})

module.exports = router 