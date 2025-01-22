import {DEFAULT_GAME_SCORE} from './../consts/defaults.consts'
import { spreadOperator } from '../helpers/spreadOperator';

export const updateUserGameInfo =  (username, gameInfo) => {

     // MOCKING an api call - instead of local storage I would store user info/game info in a db
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users[username] ;
    
    if (user) {
        const {gameType, userResult} = gameInfo
        if(!user.playerScoreInfo){
            user.playerScoreInfo = DEFAULT_GAME_SCORE
        }
        const updatedScore = user.playerScoreInfo[gameType][userResult] + 1;
        const updatedPlayerScoreInfo = spreadOperator(user.playerScoreInfo, {[gameType] : {[userResult] : updatedScore}} )
        const updatedUser =  spreadOperator(user , {playerScoreInfo : updatedPlayerScoreInfo});
        users[username] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }else{
        console.error(`User: ${user} not found`)
    }
  
  
            
   

}

export const retrieveUserGameInfo = (userName) => {
    // MOCKING an api call - instead of local storage I would store user info/game info in a db
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

   
    const user= users[userName];
    
    if (user) {

       if(user.playerScoreInfo){
        return user.playerScoreInfo 
       }
       return DEFAULT_GAME_SCORE
      
    }
  
  
            
   
}