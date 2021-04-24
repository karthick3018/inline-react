import {h} from 'preact';
import habitat from 'preact-habitat';
import Render from './app';

function init() {
	let habitatApp = habitat(Render); 

	habitatApp.render({
		inline: process.env.NODE_ENV === 'development'?true:false,
		clean: false,
		clientSpecified:true
	});
}

init();