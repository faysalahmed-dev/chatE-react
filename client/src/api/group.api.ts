import axios from '@/api/api';

export const getGroups = async () => {
   try {
      const res = await axios.get('groups');
      return res.data.data;
   } catch (err) {
      return Promise.reject(err);
   }
};

export const getGroup = async (groupSlub: string) => {
   try {
      const res = await axios.get('groups/' + groupSlub);
      return res.data.data;
   } catch (err) {
      console.log(err);
      return Promise.reject(err);
   }
};
