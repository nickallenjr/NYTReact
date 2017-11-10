const router = require('express').Router();
const db = require('../models');
var request = require("request");


router.route('/news')
    .get((req, res) => {
        request("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=1fd840b229e247b29b7c509b40c5b396", (err, response, html) => {
            const mongoResults = {};

            for (var i = 0; i < 15; i++) {
                mongoResults.summary = response.response.docs[i];
                mongoResults.headline = response.response.docs[i].snippet;
                mongoResults.link = response.response.docs[i].web_url;
                mongoResults.image = response.response.docs[i].byline.original;

                const entry = new Article(mongoResults);
                
                entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    }else {

                    }
                });
            } 
        }).pipe(res)
    })

router.route('/fetch')
    .get((req, res) => {
        db.Article
            .find()
            .then(results => res.json(results))
            .catch(err => res.status(500).json(err));
    });

// router.route('/create')
//     .post((req, res) => {
//         db.Todo
//             .create(req.body)
//             .then(results => res.json(results))
//             .catch(err => res.status(500).json(err));
//     });

// router.route('/complete/:id')
//     .put((req, res) => {
//         db.Todo
//             .findOneAndUpdate({ _id: req.params.id}, {$set: { completed: true}})
//             .then(results => res.json(results))
//             .catch(err => res.status(500).json(err));
//     })

// router.route('/uncomplete/:id')
//     .put((req, res) => {
//         db.Todo
//             .findOneAndUpdate({ _id: req.params.id}, {$set: { completed: false}})
//             .then(results => res.json(results))
//             .catch(err => res.status(500).json(err));
//     })

// router.route('/delete')
//     .delete((req, res) => {
//         db.Todo
//             .findById({ _id: req.params.id})
//             .then(results => results.remove())
//             .then(results => res.json(results))
//             .catch(err => res.status(500).json(err));
//     });

module.exports = router;
