let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001'
        break;
    case 'redbadge-geotp-client.herokuapp.com':
        APIURL = 'https://redbadge-geotp-server.herokuapp.com'
}
export default APIURL;