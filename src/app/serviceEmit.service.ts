import { Injectable, EventEmitter } from '@angular/core';

/**
 * app服务
 */
@Injectable()
export class AppService {
    childService = new EventEmitter<string>();
    constructor() {
    }
}