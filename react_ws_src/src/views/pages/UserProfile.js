import React, { useCallback, useEffect , useState} from 'react';
import { useAppContext } from '../../context/app.context';
import { Redirect } from 'react-router-dom';
import {retrieveUserGameInfo} from '../../api/userInfo'

export const UserProfile = () => {
    const {dispatch, state: {username }} = useAppContext()
    if(!username){
        return <Redirect to={'/login'} />
    }
    const logout = useCallback(() => {
      dispatch({type : 'LOGOUT', payload : {}})
    }, [dispatch])
    
    const [playerScoreInfo, setPlayerScoreInfo] = useState(null)
    useEffect(() => {
      const fetchGameScoreInfo = () => {
        const result = retrieveUserGameInfo(username)
        if(result){
          setPlayerScoreInfo(result)
        }
      }
      if(playerScoreInfo === null){
        fetchGameScoreInfo()
      }
    },[username])
    
    return (<div id='page-container'>
					
        <div>
            <h2>Welcome, {username}</h2>
        </div>
       
        {playerScoreInfo &&      <table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Game Type</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Draws</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Against Computer</td>
      <td>{playerScoreInfo.comp.win} </td> 
      <td>{playerScoreInfo.comp.loss}</td>  
      <td>{playerScoreInfo.comp.draw}</td> 
    </tr>
    <tr>
      <td>Against Players</td>
      <td>{playerScoreInfo.player.win}</td>  
      <td>{playerScoreInfo.player.loss}</td>  
      <td>{playerScoreInfo.player.draw}</td>  
    </tr>
  </tbody>
</table>}
   
<button
            type="button"
            onClick={logout}
            className="button"
          >
            <span>LOGOUT <span className="fa fa-caret-right"></span></span>
          </button>
    </div>)
}