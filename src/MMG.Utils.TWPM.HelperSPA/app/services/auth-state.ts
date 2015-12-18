﻿import {Person} from "app/models/person";
import {AuthUserInfo} from "app/models/auth-info";
import {TWPMClientFactory} from "app/services/twpm-client-factory";

export module AuthState {

    "use strict";
    export let apiToken: string = "";
    export let userInfo: Person;
    let authenticatedUser: AuthUserInfo;

    export function isAuthenticated (): boolean {
        return authenticatedUser != null && userInfo != null;
    }

    export function validateApiToken (pApiToken: string, pAuthUser: AuthUserInfo): void {
        if (!isApiTokenValid(pApiToken))
            throw new Error("Api token cannot be empty!");
        if (!pAuthUser || !pAuthUser.installURL)
            throw new Error("A valid AuthUserInfo object with a valid installURL must be provided!");
        
        apiToken = pApiToken;
        authenticatedUser = pAuthUser;
        TWPMClientFactory.baseURL = pAuthUser.installURL;
    }

    export function persistAuthentication (pPersonInfo: Person): void {
        if (!pPersonInfo)
            throw new Error("Person object cannot be null!");
        if (!isApiTokenValid(apiToken) || !authenticatedUser)
            throw new Error("Invalid state for authentication object.");

        userInfo = pPersonInfo;
    }

    export function ensureAuthenticated (): void {
        if (!isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    export function reset (): void {
        if (!isAuthenticated())
            return;

        apiToken = "";
        userInfo = null;
        TWPMClientFactory.baseURL = "";
    }

    function isApiTokenValid (pApiToken: string): boolean {
        return pApiToken && pApiToken.trim().length >= 0;
    }


}