import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReward } from 'react-rewards';

export default function RedeemCard({user}: any){
    const [showCode, setShowCode] = useState(false);
    const {reward, isAnimating} = useReward('rewardId', 'confetti');
    const navigate = useNavigate();
    
    const handleRedeem = (e) => {
        e.preventDefault();
        setShowCode(!showCode);
        if(!showCode){
          reward();  
        }
    }

    const subtractPointsFromUser = async () => {
        try {
            const data = user;
            const options = {
              method: "DELETE",
              url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/points`,
              data: { data : {...data, redeemedPoints: 1000} },
            };
            const response = await axios.request(options);
            if (response) {
              return response;
            }
          } catch (error) {
            console.log(error);
          }
    }

    const handleGenerate = async(e) => {
        e.preventDefault();
        if (window.confirm('Your Code Is "THXFRTRYINGTHISDEMO2022"')) {
            await subtractPointsFromUser();
            navigate("/");
          }
    }

    return (
        <div className="card text-center" style={{ width: "30rem" }}>
          <div className="card-header" style={{ backgroundColor: "#000" }}>
            Rewards
          </div>
          <div className="image-vibe"></div>
          <div className="card-body display-me">
              <p>Claim Your Rewards Below</p>
              <div>
                  {user.points >= 1000 ? 
                  <button disabled={isAnimating} onClick={handleRedeem}>
                      Shoe Inc. Rewards Code - 1000 Points
                      <span id="rewardId" />
                      </button>
                  : <button>Not Enough Points</button>
                }
              </div>
              <div>
                  {showCode ? 
                  <div>
                      <div className="mt-3">
                          <p>Redeem Points and Generate Code?</p>
                      </div>
                      <div>
                         <button onClick={handleGenerate}>Generate Code</button> 
                      </div>
                      
                  </div> 
                  : null}
              </div>
          </div>

        </div>
    );
}