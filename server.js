var express = require('express'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 3000,
    app = express();

app.use(bodyParser.text({
    type: 'application/json'
}));

app.post('/', function (req, res) {
    var _ = require("underscore"),
        payload, result;

    try {
        payload = JSON.parse(req.body).payload;
    } catch (e) {        
        return res.send(400, {
            error: 'Could not decode request: JSON parsing failed'
        });
    }

    result = _.chain(payload)
                .filter(function (item) {
                    return item.drm
                            && item.episodeCount > 0;
                })
                .map(function (item) {
                    return {
                        slug: item.slug,
                        title: item.title,
                        image: item.image.showImage
                    }
                })
                .value();

    res.send({ response: result });
});

app.listen(PORT);
