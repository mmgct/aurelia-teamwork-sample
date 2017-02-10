﻿import {RouterConfiguration, Router, Redirect, NavigationInstruction, PipelineStep } from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {AuthState} from "app/services/auth-state";

export class App {
    router: Router;

    configureRouter (config: RouterConfiguration, router: Router) {
        config.title = "Wish Teamwork Did That...";
        config.addPipelineStep("authorize", AuthorizeStep);
        config.map([
            { route: ["", "account/login"], name: "account-authenticate", moduleId: "./modules/account/login", nav: true, title: "Login", auth: false },
            { route: "projects/all", name: "project-all", moduleId: "./modules/projects/project-list", nav: true, title: "All Projects", auth: true },
            { route: "tasks/mine", name: "tasks-my", moduleId: "./modules/tasks/mylist", nav: true, title: "My Tasks", auth: true },
            { route: "tasks/training", name: "tasks-training", moduleId: "./modules/tasks/training", nav: true, title: "Training Tasks", auth: true },
            { route: "tasks/by-project", name: "tasks-by-project", moduleId: "./modules/tasks/project-tasks", nav: false, title: "Project Tasks", auth: true },
            { route: "people/all", name: "people-all", moduleId: "./modules/people/people-all", nav: true, title: "Peepz", auth: true },
            { route: "files/by-project", name: "files-by-project", moduleId: "./modules/files/project-files", nav: false, title: "Project Files", auth: true }
        ]);

        this.router = router;
    }
}

@autoinject()
class AuthorizeStep {
    constructor (private authState: AuthState) {}

    run (navigationInstruction: NavigationInstruction, next: Function): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config["auth"])) {
            let isLoggedIn = this.authState.isAuthenticated();

            // ReSharper disable once TsNotResolved
            if (!isLoggedIn) {
                return (<any>next).cancel(new Redirect("modules/account/login"));
            }
        }

        return next();
    }
}