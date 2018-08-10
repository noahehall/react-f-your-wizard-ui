import React from 'react'
import Wizard from 'react-f-your-wizard-ui'
import DefaultSteps from './DefaultSteps'

/**
 * Primer  AI demo of wizard component
 * @type {[type]}
 */
export default class PrimarAI extends React.Component {
	getComponentStyle = () => (
		`
			#example {
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
			<div id='example'>
				<style>{this.getComponentStyle()}</style>
				<Wizard
					steps={DefaultSteps}
				/>
			</div>
		)
	}
}
