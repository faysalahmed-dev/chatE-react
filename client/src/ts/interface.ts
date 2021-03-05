export interface UserI {
   id: string;
   name: string;
   username: string;
   avater: string;
   groupId: string;
}

export type ActiveUser = UserI;

export type ActiveUserList = { total: number; users: ActiveUser[] };

export type Message = {
   id: string;
   text: string;
   groupId: string;
   sender: Omit<UserI, 'groupId'>;
};

export type ChatUser = Omit<UserI, 'groupId'>;

export interface RequestObj {
   to: ChatUser;
   from: ChatUser;
}

export interface NewFriendRequest {
   sender: ChatUser;
   reciver: ChatUser;
}
