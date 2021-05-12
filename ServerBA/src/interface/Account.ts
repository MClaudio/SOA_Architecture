import { User } from './User';
import { Transfer } from './Transfer';
export interface Account{
    numberAccount:string;
    total:number;
    corporation:string;
    user:User;
    transfers?:Transfer[];
}