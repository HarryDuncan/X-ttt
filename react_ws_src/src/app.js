import React from 'react'
import app from 'ampersand-app'
import { render } from 'react-dom'
import { Router, Route, browserHistory , Switch ,Redirect} from 'react-router'
import { createBrowserHistory} from 'history'
import ga from 'react-ga'

import './sass/main.scss'

import Main from './views/Main'

import Ttt from './views/ttt/Ttt'

import Txt_page from './views/pages/Txt_page'
import PopUp_page from './views/pages/PopUp_page'

import Contact from './views/pages/Contact'
import ErrorPage from './views/pages/ErrorPage'
import LoginPage from './views/pages/LoginPage'
import prep_env from './models/prep_env'
import { AppProvider } from './context/app.context'
import { UserProfile } from './views/pages/UserProfile'



let renderSite = function (history) {
	return render((
		<AppProvider>
<Router history={history}>
			<Main>
			  <Switch>
			  <Route exact path="/" render={() => <Redirect to="/ttt" />} />
				<Route path="/pg/:page" component={Txt_page} />
				<Route path="/user-profile" component={UserProfile} />
				<Route path="/ttt" component={Ttt} />
				<Route path="/pupg/:pu_page" component={PopUp_page} />
				<Route path="/contact-us" component={Contact} />
				<Route path="/error/404" component={ErrorPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="*" component={ErrorPage} />
				
			  </Switch>
			  </Main>
			</Router>
		</AppProvider>
		
		
			
			
	), document.getElementById('root'))
}

// ----------------------------------------------------------------------
// This section is used to configure the global app
// ----------------------------------------------------------------------

window.app = app

app.extend({

	settings: {
		is_mobile: false,
		mobile_type: null,
		can_app: false,

		ws_conf: null,

		curr_user: null,

		user_ready: false,
		user_types: [],
		basket_type: null,
		basket_total: 0,

	},


	init () {

		prep_env(this.start.bind(this))

	},

	start_ga(history) {
		ga.initialize(app.settings.ws_conf.conf.ga_acc.an, { debug: true });

		// Create the history object for BrowserRouter
		
	  
		// Listen for location changes and send pageview to Google Analytics
		history.listen((location) => {
		  ga.pageview(location.pathname);
		});
	  },
	
	  start() {
		const history = createBrowserHistory();
		this.start_ga(history);
		renderSite(history);
	  },
	
	  show_page(u) {
		switch (u) {
		  case 'home':
			browserHistory.push('/');
			break;
	
		  default:
			console.log('show_page event with:', u);
			browserHistory.push(u);
			break;
		}
	  },
	
	 

	
	events: {
		show_message: 'show_message',
		show_page: 'show_page'
	},
})

app.init()

app.on(app.events.show_page, app.show_page)
