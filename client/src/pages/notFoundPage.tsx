import React from 'react';
import ErrorComponent from '@/components/errorComponent';

const notFoundPage: React.FC = () => {
   return (
      <ErrorComponent
         message='Oppps. Page Not Found'
         statusCode={404}
         navigateText='Back To Home'
         navigateTo='/'
      />
   );
};

export default notFoundPage;
