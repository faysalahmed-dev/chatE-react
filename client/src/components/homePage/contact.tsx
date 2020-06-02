import React from 'react';

export default ():JSX.Element => {
	return (
		<section className="body-font relative">
		<div className="container px-5 py-24 mx-auto flex sm:flex-no-wrap flex-wrap">
		<div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
		  <iframe width="100%" height="100%" title="map" className="absolute inset-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15944.112085437702!2d91.8265466278857!3d22.332377519609427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a90882e075%3A0x72e2d1e072cda4f2!2sN%20Nalapara%20Rd%2C%20Chittagong%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1590942130856!5m2!1sen!2sus" style={{filter: "grayscale(1) contrast(1.2) opacity(0.50)"}}></iframe>
		  <div className="dark-light-bg relative flex flex-wrap py-6">
		    <div className="lg:w-1/2 px-6">
		      <h2 className="title-font font-medium text-white tracking-widest text-sm">ADDRESS</h2>
		      <p className="leading-relaxed">North Nalapara, Ice Factory Road, Chittagong, Bangladesh</p>
		    </div>
		    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
		      <h2 className="title-font font-medium text-white tracking-widest text-sm">EMAIL</h2>
		      <a className="text-indigo-500 leading-relaxed">fasyalahmed146@gmail.com</a>
		      <h2 className="title-font font-medium text-white tracking-widest text-sm mt-4">PHONE</h2>
		      <p className="leading-relaxed">+880 01997261058</p>
		    </div>
		  </div>
		</div>
		<div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
		  <h2 className="text-white text-lg mb-1 font-medium title-font">Contact Me</h2>
		  <p className="leading-relaxed mb-5 text-gray-600">Went Work With Me Contact Me by Email, Phone or Send Message</p>
		  <input className="dark-light-bg rounded-lg focus:outline-none focus:border-indigo-500 text-base text-white px-4 py-2 mb-4" placeholder="Name" type="text" />
		  <input className="dark-light-bg rounded-lg focus:outline-none focus:border-indigo-500 text-base text-white px-4 py-2 mb-4" placeholder="Email" type="email" />
		  <textarea className="dark-light-bg rounded-lg focus:outline-none h-32 focus:border-indigo-500 text-base text-white px-4 py-2 mb-4 resize-none" placeholder="Message"></textarea>
		  <button className="text-light bg-purple-600 border-0 py-2 px-6 focus:outline-none hover:bg-purple-700 rounded-lg">Button</button>
		</div>
		</div>
		</section>
)
}
