import React, { useCallback , useState} from 'react'

import SetGameType from './SetGameType'
import {updateUserGameInfo} from './../../api/userInfo'
import GameMain from './GameMain'
import { useAppContext } from '../../context/app.context'
import { Redirect } from 'react-router-dom'


const GAME_STEPS = {
	'SET_GAME_TYPES': 'set_game_type',
	'START_GAME' : 'start_game'
}
const Ttt  = () => {
		const [gameStep, setGameStep] = useState(GAME_STEPS.SET_GAME_TYPES)
		const [gameType , setGameType] = useState(null)
		const {dispatch, state : {username}} = useAppContext();

		const onSetType = useCallback((gameType) => {
			setGameType(gameType)
			setGameStep(GAME_STEPS.START_GAME)
		}, [setGameStep, setGameType])

		const onEndGame = useCallback((gameInfo) => {
			const userResult = gameInfo.result === 'You win' ? 'win' : gameInfo.result === 'Draw' ? 'draw' : "loss";
			updateUserGameInfo(username, {gameType, userResult})
			setGameStep(GAME_STEPS.SET_GAME_TYPES)
		}, [setGameStep, dispatch,gameType])

		if(username === null){
			return <Redirect to='/login' />
		}
		return (
			<section id='TTT_game'>
				<div id='page-container'>
					
						<div>
							<h2>Welcome, {username}</h2>
						</div>
					
					{gameStep === GAME_STEPS.SET_GAME_TYPES && <SetGameType 
														onSetType={onSetType} 
													/>}
					{gameStep === GAME_STEPS.START_GAME && <GameMain 
														game_type={gameType}
														onEndGame={onEndGame} 
													/>}

				</div>
			</section>
		)
	}



export default Ttt