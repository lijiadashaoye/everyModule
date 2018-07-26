import {
    Component
} from '@angular/core';
import {
    AppService
} from './serviceEmit.service';
import { ComfirmService } from './comfirm.service'
import {
    Router
} from '@angular/router';
import {
    Observable, Subject
} from 'rxjs'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    child: string = '';
    constructor(
        private appService: AppService,
        private route: Router,
        public toConfirm: ComfirmService
    ) {
        this.appService.childService.subscribe((value: string) => {
            if (value) {
                this.child = '通过服务中的 emit跳过来的：' + value;
            } else {
                this.child = null
            }
        })
    }
    ngOnInit() {

    }
    login() {
        sessionStorage.setItem('name', 'f')
    }
    loginOut() {
        sessionStorage.clear()
    }
    canGo() {
        sessionStorage.setItem('go', 'f')
    }
    canNotGo() {
        sessionStorage.removeItem('go')
    }
    canLeave() {
        sessionStorage.setItem('leave', 'f')
    }
    canNotLeave() {
        sessionStorage.removeItem('leave')
    }
    toTwo() {
        let routeChildData = 'twoChild4'
        this.route.navigate(['two', routeChildData, {
            id: 'heroId',
            foo: 'foo'
        }])
    }
    async compose3() {


        this.route.navigate([{
            outlets: {
                popup3: ['compose3']
            }
        }])

        // let kk = await (() => {
        //     return new Promise(res => {
        //         this.route.navigate([{
        //             outlets: {
        //                 popup3: ['compose3']
        //             }
        //         }])
        //         let confirmResult = new Subject();
        //         confirmResult.subscribe(val => {
        //             console.log(val)
        //         })
        //         res('9')
        //     })
        // })();
        // console.log(kk)
    }
    getpopupResult(data) {
        console.log(data)
    }
}