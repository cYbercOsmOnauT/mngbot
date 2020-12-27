module.exports = {
    name: "http",
    description: "Internet requests",
    headers: {
        "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.1.2; SM-T800 Build/NJH47F)"
    },
    GET(_url, _callback) {
        AXIOS.get(_url)
            .catch(function (_error) {
                _callback({
                    statusCode: _error.statusCode,
                    body: null
                });
            })
            .then(function (_response) {
                _callback({
                    statusCode: _response.statusCode,
                    body: _body
                });
            });
    },
    HEAD(_url, _callback) {
        AXIOS.head(_url)
            .catch(function (_error) {
                _callback({
                    statusCode: _error.statusCode,
                    body: null
                });
            })
            .then(function (_response) {
            _callback({
                statusCode: _response.statusCode,
                body: _body
            });
        });
    }
}