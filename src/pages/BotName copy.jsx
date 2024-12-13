import { useState } from "react";
import Card from "../components/Card/card";
import { Pause, Config, ViewIcon } from "../icons/icons";
import Button from "../uielement/Button";
import tradigImg from "../assets/trading.png"
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";

import PopOut from "../uielement/PopOut";
import Bots from "./bots";
function BotName() {
  const [isconfig, SetConfig] = useState(false);
  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];
  function configHandler() {
    SetConfig(!isconfig);
  }
  return (
    <div className="bot-dynamic">
         {isconfig && <PopOut className="config-popin" component={<Bots/>} />}
      <div className="top-trade-con">
     
        <div>
          <h2 className="heading-top">
            MyFirstBot
            <div className="live-trade">
              <span className="circle-live"></span>
              <p>Activ Bots</p>
            </div>
          </h2>
          <p className="startigies-name">
            Based on <span>“Tony’s Strategy”</span>
          </p>
        </div>
        <div className="right-btn">
          <Button buttonType="link" className="default-btn pink">
            <Pause/>Stop
          </Button>
          <Button buttonType="button" handler={configHandler} className="default-btn">
            <Config/>Configure
          </Button>
          <Button buttonType="link" className="default-btn">
            <ViewIcon/>Switch to Paper Trade
          </Button>
        </div>
      </div>
      <div className="conatiner-grid cards bot-name-ui">
        <Card heading="Bot Balances">
          <div className="table-bar">
            <div className="head">
              <p>Token</p>
              <p>DAI VALUE</p>
            </div>
            <div className="head heading heighlighted">
              <p>Local Wallet</p>
            </div>
            <div className="head data">
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
            </div>
          </div>
        </Card>

        <Card heading="Exchange Balances">
          <div className="table-bar">
            <div className="head">
              <p>Token</p>
              <p>DAI VALUE</p>
            </div>
            <div className="head heading heighlighted">
              <p>Local Wallet</p>
            </div>
            <div className="head data">
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
            </div>

            <div className="head heading heighlighted">
              <p>Local Wallet</p>
            </div>
            <div className="head data">
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="trading-card">
        <Card  heading="Trading Activity">
          <img src={tradigImg}/>
        </Card>
      </div>
      <div className="stratiges trade-logs">
      
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
        <h2 className="heading-top">
        Log
        <span>
          {<DropDownSelect options={options} />}{" "}
          <InputType type="text" placeholder="Search" />
        </span>
      </h2>
       <div className="stamps-container">
       
              <div className="first-grid">TIME STAMP</div>
              <div className="first-grid">TYPE</div>
              <div className="first-grid">MESSAGE</div>
             
           
       
              <div>2024-10-20 | 08:20</div>
              <div>Event_Log</div>
              <div colSpan={0} className="dull-color"> timestamp": 1552347628.0, "type": "OrderType.LIMIT", "symbol": "BAT-WETH", "amount": "420.43", "price": "0.0014201", "order_id": "buy-BAT-WETH-1552347626009189", "event_name": "BuyOrderCreatedEvent", "event_source": "DDEXMarket</div>
         
       </div>
        </Card>
      </div>
    </div>
    {isconfig && <div onClick={configHandler} className="back-drop"></div>}
    </div>

  );
}

export default BotName;
