import { IconButton, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function RegionCard(props) {

  const { region, user } = props;
  console.log(region);
  console.log(user);
  const navigate = useNavigate();


  function handleClick() {
    let name = (region.name).replaceAll(" ", "-");
    console.log(name);
    navigate(`/regions/${name}`, { state: { regionName: region.name, regionId: region.id, id: user.id, username: user.username, email: user.email } });
  }

  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#93a8ac] rounded-lg shadow-xl p-3">
      <div className="flex flex-col items-center pt-4 h-full">
        <Button variant="ghost" onClick={() => handleClick()} className="">
          <div className="flex flex-col items-center">
            <div className="md:shrink-0">
              <img
                className="h-32 w-full object-cover sm:h-48 md:h-full md:w-48"
                src={`/regionPictures/${region.name}.jpg`}
                alt={region.name}
              />
            </div>
            <div className="flex items-center justify-items-center">
              <p className="text-sm font-semibold text-gray-800 pt-3">{region.name}</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default RegionCard;
