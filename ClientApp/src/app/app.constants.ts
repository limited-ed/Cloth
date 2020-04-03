import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    private static prodServer = '10.109.225.151';
    private static prodServerPort = '5000';

    // tslint:disable-next-line: max-line-length
    public static Server = Configuration.getEnvironmentVariable() === 'develop' ? 'http://localhost:5000' : 'http://' + Configuration.prodServer + ':' + Configuration.prodServerPort;


    private static getEnvironmentVariable(): string {
        let environment: string;
        let data: string;
        environment = window.location.hostname;
        switch (environment) {
            case'localhost':
                data = 'develop';
                break;
            case Configuration.prodServer:
                data = 'prod';
                break;

            default:
                data = 'develop';
        }
        return data;
    }
}

