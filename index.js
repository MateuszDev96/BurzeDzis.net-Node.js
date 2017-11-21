var soap = require('soap');

const client = (function () {
    'use strict';

    function methods(client, key) {
        return {
            searchLightningByCoords({ x, y, range }) {
                return new Promise((resolve, reject) => {
                    client.szukaj_burzy({ x, y, promien: range, klucz: key }, (err, result) => {
                        if (err) {
                            return reject(err);
                        }

                        let returned = result.return;
                        resolve({
                            count: returned.liczba.$value,
                            distance: returned.odleglosc.$value,
                            direction: returned.kierunek.$value || '',
                            time: returned.okres.$value
                        });
                    });
                });
            },
            searchCoordsByCityName({ city }) {
                return new Promise((resolve, reject) => {
                    client.miejscowosc({ nazwa: city, klucz: key }, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        let returned = result.return;
                        resolve({
                            x: Number(returned.x.$value),
                            y: Number(returned.y.$value)
                        })
                    });
                });
            },
            searchWarningsByCoords({ x, y }) {
                return new Promise((resolve, reject) => {
                    client.ostrzezenia_pogodowe({ x, y, klucz: key }, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        let returned = result.return;
                        resolve({
                            frost: returned.mroz.$value,
                            frostOf: returned.mroz_od_dnia.$value,
                            frostTo: returned.mroz_do_dnia.$value,
                            heat: returned.upal.$value,
                            heatOf: returned.upal_od_dnia.$value,
                            heatTo: returned.upal_do_dnia.$value,
                            wind: returned.wiatr.$value,
                            windOf: returned.wiatr_od_dnia.$value,
                            windTo: returned.wiatr_do_dnia.$value,
                            rainfall: returned.opad.$value,
                            rainfallOf: returned.opad_od_dnia.$value,
                            rainfallTo: returned.opad_do_dnia.$value,
                            storm: returned.burza.$value,
                            stormOf: returned.burza_od_dnia.$value,
                            stormTo: returned.burza_do_dnia.$value,
                            whirlwind: returned.traba.$value,
                            whirlwindOf: returned.traba_od_dnia.$value,
                            whirlwindTo: returned.traba_do_dnia.$value
                        });
                    });
                });
            }
        }
    }

    class Service {
        constructor({ url, key }) {
            this.url = url;
            this.key = key;
        }
        connect() {
            return new Promise((resolve, reject) => {
                soap.createClient(this.url, (err, client) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(methods(client, this.key));
                });
            });
        }
    }

    return {
        Service
    };
}());

module.exports = client;
