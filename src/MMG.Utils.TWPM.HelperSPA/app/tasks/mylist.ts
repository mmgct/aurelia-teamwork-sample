﻿import {TWPMService} from "../services/twpm-svc";

export class App {
    apiToken: string;
    twpmService: TWPMService;
    myTasks: typeof undefined[];
    
    isAuthenticated: boolean;

    constructor() {
        this.twpmService = new TWPMService();
        this.myTasks = [];
    }
    
    activate() {
       
    }

    authenticate () {
        this.twpmService.setApiToken(this.apiToken);
        this.isAuthenticated = true;
    }

    loadTasks () {
        return this.twpmService.fetchTasks().then(response => {
            if (!response.isSuccess)
                throw new Error("Bad request from TeamworkPM.");

            this.myTasks = response.content["todo-items"];
        });
    }
    
}