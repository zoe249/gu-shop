import { v4 as uuidv4 } from 'uuid';
// 随机生成一个随机的自粗口，且每次执行不在变化，游客身份持续存储
export const getUUID = () => {
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有重新生成
    if (!uuid_token) {
        // 生成随机代码 
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}