var contentManager = function(app, Content) {

    app.get("/api/iseeq-store/list/companies", function(req, res) {
        Content.find({}, function(err, success) {
            if (success) {
                res.status(200).json({
                    result: success.map(function(data){
                        return data.company
                    })
                });
            } else {
                res.status(404).json({
                    msg: "Error!"
                });
            }
        });
    });

    app.get("/api/iseeq-store/list/all", function(req, res) {
        Content.find({}, function(err, success) {
            if (success) {
                res.status(200).json({
                    result: success
                });
            } else {
                res.status(404).json({
                    msg: "Error!"
                });
            }
        });
    });

    app.get("/api/iseeq-store/:company", function(req, res) {
        // get the application settings from the mongodb

        var companyName = req.params.company;

        Content.findOne(
            {
                company: companyName
            },
            function(err, success) {
                if (success) {
                    res.status(200).json({
                        result: success
                    });
                } else {
                    res.status(404).json({
                        msg: "Not found: " + companyName
                    });
                }
            }
        );
    });

    app.post("/api/iseeq-store/add", function(req, res) {
        // insert into/overwrite existing application in mongodb document
        var companyName = req.body.company;
        var content = req.body.data; // the posted content should be a stringified object

        try {
            Content.findOneAndUpdate(
                {
                    company: companyName
                },
                {
                    data: content
                },
                {
                    new: true,
                    upsert: true
                },
                function(err, doc) {
                    if (err) {
                        res.status(400).json({
                            result: err
                        });
                    } else {
                        res.status(200).json({
                            msg: "New settings: " + doc
                        });
                    }
                }
            );
        } catch (e) {
            res.status(500).json({
                msg: "Something went wrong: " + e
            });
        }
    });
};

exports.contentManager = contentManager;
