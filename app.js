const lightnings = require('./index');
const client = new lightnings.Service({
    url: 'https://burze.dzis.net/soap.php?WSDL',
    key: '<API_KEY>'
});

client.connect().then(methods => {
    // logic
});
