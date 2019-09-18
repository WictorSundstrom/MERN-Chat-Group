// Import npm packages
import axios from 'axios'

// Import lokala componenter
import { logout, getToken } from '../Auth-components/Auth'

// Funktionell komponent
export const Logout = (props) => {
        
        // Skicka en förfrågan till back-end, med: Post, Url och Vad du vill skicka med. (I detta fall token för den inloggade)
        axios({
            method: 'post',
            url: 'http://localhost:3001/logout',
            data: {
                token: getToken()
            }
        
        // Om all godkändes i back-end så kommer man tillbak hit och skickas då till /login och logout som köras
        }).then((result) => {
            if (result) {
                props.history.replace({
                    pathname : '/login'
                })
                // Kör logout som finns i Auth
                logout()
                console.log('Log out succesful')
            }
        
        // Vid fel i back-end så loggas de ut.
        }).catch((err) => {
            if(err) {
                console.log("Log out error")
            }
        })
    }