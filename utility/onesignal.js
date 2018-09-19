var https = require('https');

var notifier = {
    fireNotification(heading, body,pData=null, pImgUrl = null, segments = ['All']) {
        var sendNotification = function (data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Basic MjIzMDI1YTUtMmI2NC00ODZkLTljZWQtMTA1NzRmNDMxODBj"
            };

            var options = {
                host: "onesignal.com",
                port: 443,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
            };


            var req = https.request(options, function (res) {
                res.on('data', function (data) {
                    console.log("Response:");
                    console.log(JSON.parse(data));
                });
            });

            req.on('error', function (e) {
                console.log("ERROR:");
                console.log(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        };

        var message = {
            app_id: "a44e9432-2ecb-413a-9bdb-98f114dcbfc7",
            headings: { "en": heading },
            contents: { "en": body },
            included_segments: segments
        };

        if (pImgUrl != null) { message.big_picture = pImgUrl; }

        if(pData!=null){ message.data = pData; }

        sendNotification(message);
    }
}

module.exports = notifier;