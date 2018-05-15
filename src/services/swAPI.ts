import { environment } from "../common/environment";
import * as http from 'http';

class SWApiService {

    constructor() {
    }
    // Hoth
    public teste(nomePlanet) {
        var listaFilmes = [];
        return http.get(`${environment.urlSWApi}planets/?search=${nomePlanet}`, function (res) {
            // console.log(res);
            // request(body, function (error, response, body) {
            //     console.log(body);
            // listaFilmes.push("");
            // });
            // return listaFilmes;
        });
    }
}

export default new SWApiService();