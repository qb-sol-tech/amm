import { useState, useEffect } from "react";
import Card from "../components/Card/card";
import { Pause, Config, ViewIcon , AnimatedLoader } from "../icons/icons";
import Button from "../uielement/Button";
import tradigImg from "../assets/trading.png"
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";
import {getActiveBot} from '../util/Apis';
import PopOut from "../uielement/PopOut";
import Bots from "./bots";
function BotName() {
  const [loader , setLoader] = useState();
  const [bots, SetBots] = useState();
  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];
  function configHandler() {
    SetConfig(!isconfig);
  }
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoader(true)
        const getbots = await getActiveBot();
     
        SetBots(getbots);
        setLoader(false)

      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, []);
  return (
    <div className="bot-dynamic">
        
      <div className="top-trade-con">
     
        <div>
          <h2 className="heading-top">
            Active Bots
            <div className="live-trade">
              <span className="circle-live"></span>
              <p>Live</p>
            </div>
          </h2>
          <p className="startigies-name">
           
          </p>
        </div>
        <div className="right-btn">
        
        </div>
      </div>
      <div className=" bot-name-ui">
        <Card heading="" className="full">
          <div className="table-bar">
            <div className="head grid-three">
              <p>Bot Name </p>
              <p>Status</p>
              <p> Created On</p>
              <p className="grid-last">Start/Stop</p>
            </div>
           {console.log(bots)}
            {(bots?.data && Object.keys(bots?.data).length > 0) ? Object.entries(bots?.data).map((ele, index)=>    <div key={index} className="head data">
              <div className="grid-three">
                <p>{ele[0].split("-")[1]} </p>
                <p>{ele[1].status}</p> 
                <p>{ele[0].split("-")[2]}</p>
                {ele[1].status == "stopped" &&   <p className="grid-last"><Button className="default-btn">Run Bot</Button></p>}
                {ele[1].status == "started" &&   <p className="grid-last"><Button className="default-btn pink">Stop Bot</Button></p>}
              </div>
          
            </div>) : <p className="data-text">Sorry No Bot Found</p>}
        
          </div>
        </Card>

 
      </div>


    </div>

  );
}

export default BotName;
