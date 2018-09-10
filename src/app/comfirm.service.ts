import { Injectable, EventEmitter } from "@angular/core";

/**
 * app服务
 */
@Injectable()
export class ComfirmService {
  comfirmService = new EventEmitter<string>();
  constructor() {}
}
