/**
 * @author Luka Piersma
 *
 * The interface for each router.
 */

import express from "express";
import { Routes } from "../enums/routes";

export interface Router {
    getRouter(): express.Router;
    getRoute(): Routes;
}