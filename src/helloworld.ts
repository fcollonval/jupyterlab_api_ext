import {
    ServerConnection
  } from '@jupyterlab/services';

import {
	PageConfig
} from '@jupyterlab/coreutils'

export interface Greetings {
	greetings: string;
}

function getAbsoluteURL(url:string):string {
    // baseURL always comes with a trailing slash
    let baseURL = PageConfig.getBaseUrl()
    if (url.indexOf('/') == 0) {
        return baseURL + url.substring(1);
    } else {
        return baseURL + url;
    }
}
 
function request(url: string, method: string, data: any): Promise<ServerConnection.IResponse>{
    let dataRequest = {
        url: getAbsoluteURL(url),
        method: method,
        cache: true,
        contentType: 'bar',
        data: JSON.stringify(data),
    };
    return ServerConnection.makeRequest(dataRequest, ServerConnection.makeSettings());
}


export class HelloWorld {
    constructor(){}

    async get(): Promise<void> {
        try{
            var val = await request("/hello", "GET", "");
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                throw ServerConnection.makeError(val);
            }
            console.log(val.data);
            return null;
        } catch (err) {
            throw ServerConnection.makeError(err);
        }
    }
    
    async post(): Promise<void> {
        try{
            var val = await request("/hello", "POST", "");
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                throw ServerConnection.makeError(val);
            }
            console.log(val.data);
            return null;
        } catch (err) {
            throw ServerConnection.makeError(err);
        }
    }
    
    async postReply(name: string): Promise<Greetings> {
        try{
            var val = await request("/hello/personal", "POST", {"name": name});
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                throw ServerConnection.makeError(val);
            }
            return val.data;
        } catch (err) {
            throw ServerConnection.makeError(err);
        }
    }
}