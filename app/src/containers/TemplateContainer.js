// import node packages
import React from 'react';

// import related presenter
import Template from '../presenters/Template';		

// Main Container Component
var TemplateContainer = React.createClass({
	getInitialState: function () {
		return {};
	},

	render: function () {
		return <Template />;
	}
});

export default TemplateContainer;
