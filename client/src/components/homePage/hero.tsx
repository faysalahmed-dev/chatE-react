import React from 'react';
import { Link } from 'react-router-dom';

export default (): JSX.Element => {
	return (
		<section className="body-font">
		  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
		    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
		      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
		      	Real Time Chat App with
		      	<span className="text-green-500"> VueJS</span>
		      </h1>
		      <p className="mb-8 leading-relaxed">Real Time Chat App with React, Typescript Socket.io Client
		      	<br /> NodeJS, Typescript, Socket.io Mongoose + MongoDB</p>
		      <div className="flex flex-col items-start">
		      	<Link to="/register" className="inline-flex bg-gray-700 border-0 py-2 px-4 focus:outline-none hover:bg-gray-700 hover:text-white rounded">
		      		Try Now
		      	</Link>
		       	<div className="text-sm mt-3">
		       		<a href="https://github.com/faysal146/chatE-react" target="_blank" rel="noopener noreferrer" className="hover:underline">View Source Code</a>
					<a href="https://github.com/faysal146/chatE-vue" className="text-green-500 ml-2 hover:underline">Check out VueJS Version</a>
		       	</div>

		      </div>
		    </div>
		    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
		      <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
		    </div>
		  </div>
		</section>
	)
}