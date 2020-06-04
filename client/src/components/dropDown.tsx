import React from 'react'
import styled from 'styled-components';

const Notifation = styled.div`
   top: 45px;
   left: 50%;
   transform:translatex(-50%);
   width: 20rem;
   min-height: 250px;
`

export default () => {
	return (
		<Notifation className="absolute dark-light-bg shadow-md pb-2 rounded overflow-hidden">
          <p className="text-center secondary-bg p-2">Notifation</p>
          <div className="flex flex-col items-center py-2">
             <span className="mt-5">No Notifation Found</span>
          </div>
        </Notifation>
	)
}