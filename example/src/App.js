import React, { Component } from 'react'

import Wizard from 'react-f-your-wizard-ui'


/**
 * Primer  AI demo of wizard component
 * @type {[type]}
 */
export default class PrimarAI extends React.Component {
	getComponentStyle = () => (
		`
			#primar-ai {
				background-color: #F5F5F5;
			}

			.center {
				display: flex;
			  justify-content: center;
			}
		`
	)

	render() {
		return (
			<div id='primar-ai'>
				<style>{this.getComponentStyle()}</style>
				<Wizard />
			</div>
		)
	}
}
