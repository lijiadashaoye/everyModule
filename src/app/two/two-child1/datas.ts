import { AbstractControl } from '@angular/forms'
export const datas = {
    genders: [{ value: 'F', display: '女' }, { value: 'M', display: '男' }],

    roles: [{ value: 'admin', display: '管理员' }, { value: 'user', display: '普通用户' }],

    themes: [
        { backgroundColor: 'black', fontColor: 'white', display: '黑色' },
        { backgroundColor: 'white', fontColor: 'black', display: '白色' },
        { backgroundColor: 'grey', fontColor: 'white', display: '灰色' }
    ],

    topics: [
        { value: 'game', display: '游戏' },
        { value: 'tech', display: '科技' },
        { value: 'life', display: '生活' }
    ],

    hobbies: [
        { value: 'reading', display: '看书' },
        { value: 'music', display: '听歌' },
        { value: 'movie', display: '电影' }
    ],

    provinces: [
        { pk: 1, pv: '北京' },
        { pk: 16, pv: '福建' }
    ],

    citieData: [
        { pk: 1, ck: 72, cv: '朝阳区' }, { pk: 1, ck: 2800, cv: '海淀区' },
        { pk: 1, ck: 2801, cv: '西城区' }, { pk: 16, ck: 1303, cv: '福州市' },
        { pk: 16, ck: 1315, cv: '厦门市' }, { pk: 16, ck: 1332, cv: '泉州市' }
    ],
    heroes: [
        { id: 0, name: '00000' },
        { id: 1, name: '111110' },
        { id: 2, name: '222222' },
        { id: 3, name: '333330' },
        { id: 4, name: '444440' },
        { id: 5, name: '555550' },
    ]
}
export interface User {
    name: string;
    account: {
        email: string;
        confirm: string;
    }
}
export interface Hero {
    id: number,
    name: string
}