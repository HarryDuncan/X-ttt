import React, { Component} from 'react'
import {Header} from './layouts/Header'
import MainContent from './layouts/MainContent'
import Footer from './layouts/Footer'


// full height
const fullHeight = {
	height: '100%'
}

export default class Main extends Component {

	render () {
		const { children} = this.props
		return (
			<div style={fullHeight}>
				<Header/>
				<MainContent>
				{children}
				</MainContent>
				<Footer />
			
			</div>
		)
	}
}

