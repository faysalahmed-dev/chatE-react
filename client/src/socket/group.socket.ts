import { Message, RequestObj, UserI } from '@/ts/interface';

export default (io: SocketIOClient.Socket) => {
   return {
      sendMessage(message: Message, callBack?: () => void) {
         io.emit('createMessage', message, callBack);
      },
      friendJoin(userId: string, callBack: Function) {
         io.emit('friendJoin', userId, (message: string) => {
            console.log(message);
            console.log(userId);
            if (typeof callBack === 'function') callBack();
         });
      },
      sendRequest({ from, to }: RequestObj) {
         io.emit('friendRequest', { from, to }, () => {
            console.log('successfully send friend request');
         });
      },
   };
};
