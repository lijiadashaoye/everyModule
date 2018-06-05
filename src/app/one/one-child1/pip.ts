import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'flyingHeroes' })
export class FlyingHeroes implements PipeTransform {
    transform(data) {  // 必须用 transform命名函数,参数依据传递的值而定数量
        let kk = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].id % 2 == 0) {
                kk.push(data[i])
            }
        }
        return kk
    }
}