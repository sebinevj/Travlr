
import { useState, useEffect } from 'react';
import api from '../APIClient.js';
import { useNavigate, useLocation } from "react-router-dom";
import RegionCard from '../components/RegionCard.jsx';

function Home() {

    const { state } = useLocation();

    const navigate = useNavigate();

    const [regions, setRegions] = useState([]);
    const [userFollowedregions, setUserFollowedRegions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        api.getCurrentUser().then((user) => {
            console.log(user);
            setCurrentUser(user)
          }).catch(err => {
            console.log(err);
            navigate("/");
          })

        api.getRegions().then((regionList) => {
            console.log(regionList)
            setRegions(regionList);
        })
        //api.getFollowedRegions(state.id).then((regions) => {
        //     setRegions(regions);
        // })
    }, [state, navigate])


    return (
        <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">Travlr</h2>
            {currentUser && <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">{`Welcome, ${currentUser.username}`}</h2>}
            <div className="grid grid-cols-4 gap-5">
            {regions.map((region) => {
                return (
                    <RegionCard region={region} />
                )
            })}
            </div>
        </div>

    )

}

export default Home;  