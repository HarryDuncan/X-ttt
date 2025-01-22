import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
// import jquery from 'jquery'

import MessageBar from '../layouts/MessageBar'
import { useAppContext } from '../../context/app.context'
import { spreadOperator } from '../../helpers/spreadOperator'

export const Header = () =>  {
		const {state: {username}} = useAppContext()
		const navLinks = useMemo(() => app.settings.ws_conf.main_menu.pages.p.map((page) => {
			if(page.name === 'login' && username !== null){
				return spreadOperator(page, {name : username, u : 'user-profile'})
			}
			return page
		}), [app.settings, username])

		return (
			<header id='main_header'>
				<div id='brand'>
					<div className='container'>

						<Link to={app.settings.ws_conf.header.head_l_logo.u} className='logo-tl'>
							<img src={app.settings.ws_conf.header.head_l_logo.i} />
						</Link>


						<Link to={app.settings.ws_conf.header.site_title.u} className='main-site-name'>
							{app.settings.ws_conf.header.site_title.txt}
						</Link>

						<nav>
							<ul>
								{
									navLinks.map(function (p, i) {
										return (
											<li key={i}>
												<Link 	to={p.u} >
													<i className={'fa fa-2x '+p.ico} aria-hidden="true"></i>
													{p.name}
												</Link>
											</li>
										)
									})
								}
							</ul>
						</nav>

					</div>
				</div>

				<MessageBar />

			</header>
		)
	}
				

