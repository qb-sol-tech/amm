import React, { useState, useEffect } from 'react'
import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";
import stratigy from "../assets/BlackLemon_Strategies.png"
import PopOut from "../uielement/PopOut";
import StrategiesDetails from '../components/StratigyDetails/StratigyDetails';
import { DigoIcon } from "../icons/icons";
import { allControllerGonfigs , deleteConfigsApi } from '../util/Apis';
import Popmsg from '../uielement/Popmsg';

function Configurations() {
  const [controllers, setControllers] = useState();
  const [bot, setBot] = useState([]);
  const [error, setError] = useState(null);
  const [popmsg, setPopmsg] = useState(null);
  const [loadingState, setLoadingState] = useState(null); // Track button loading state
  console.log(bot)
  useEffect(() => {
    const fetchConnectors = async () => {
      const controllers = await allControllerGonfigs();
      console.log(controllers)
      setControllers(controllers)
    }

    fetchConnectors();
  }, []);


  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];
  const [isconfig, SetConfig] = useState(false);

  const handleStratigy = () => {
    SetConfig(!isconfig)
  }
  const deleteBot = () => {
    if(!(bot.length > 0)) {
      setPopmsg("Please select the feild")
      setError(true)
      setTimeout(function(){
        setPopmsg(null)
        setError(null)
      },2000)
    }
    else {

      const deleteConfigs = async () => {
        setLoadingState('deleting'); // Show loading state
    
        try {
            const delAccList = bot; // Assume `bot` contains the list of accounts to delete
            
            for (let i = 0; i < delAccList.length; i++) {
                const delAcc = delAccList[i]; // Get current element in the array
                
                // Call the API to delete the current account
                try {
                    const deleteAcc = await deleteConfigsApi(delAcc); // Wait for the API response
                    console.log(deleteAcc); // Log the response
                    
                    // Optionally: Update the state with success message or any other state change
                    setPopmsg(deleteAcc.message); // Show success message
                  
                } catch (error) {
                    // Handle error for this specific account deletion
                    console.error(`Error deleting account ${delAcc.id}:`, error);
                    setError(true);
                    setPopmsg(error?.response?.data?.detail || "Error deleting account");
                    continue; // Continue with next account on error
                }
            }
    
            // After all deletions are complete, you can optionally fetch updated connectors
            await fetchConnectors();
        } catch (error) {
            // Handle any general errors that occur during the overall process
            setError(true);
            setPopmsg(error?.response?.data?.detail || "Something went wrong");
        } finally {
            // Reset loading state once the deletion process is complete
            setLoadingState(null);
        }
    };
    
    // Function to fetch connectors after all deletions are done
    const fetchConnectors = async () => {
        try {
            const controllers = await allControllerGonfigs();
            console.log(controllers); // Log the updated list of connectors
            setControllers(controllers); // Update the UI with new data
        } catch (error) {
            console.error("Error fetching connectors:", error);
            setError(true);
            setPopmsg(error?.response?.data?.detail || "Error fetching connectors");
        }
    };
    
    // Call the deleteConfigs function to begin the process
    deleteConfigs();
    


  }
}
  function setBotValue(data) {
    if (data.target.checked) {
      setBot(prevData => [...prevData, data.target.value]);
    } else {
      setBot(prevData => prevData.filter(item => item !== data.target.value));
    }
  }
  return (
    <div className="stratiges bootconfigurtion">
        {isconfig && <div onClick={handleStratigy} className="back-drop"></div>}
        {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}
      {isconfig && <PopOut className="config-popin" component={<StrategiesDetails />} />}
      <h2 className="heading-top">
        Bot Configuration
        <span>
          {<DropDownSelect options={options} />}{" "}
          <InputType type="text" placeholder="Search" />
        </span>
      </h2>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>Available Configurations</p>
            
              <p className='configurationbt'><Button handler={deleteBot} className="default-btn">Delete</Button> <Button className="default-btn green">Launch</Button></p>
            </div>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>Config Base</td>
                  <td>Version</td>
                  <td>Controller Name</td>
                  <td>Controller Type</td>
                  <td>Connector</td>
                  <td>Trading Pair</td>
                  <td>Total Amount ($)</td>
                  <td>Max Loss ($)</td>
                  <td>SL(%)</td>
                  <td>TP(%)</td>
                  <td>Time Limit</td>
                </tr>
              </thead>
              <tbody>

                {controllers?.map((item, key) => <tr key={key}>
                  <td><input type="checkbox" value={item?.id + ".yml"} onChange={setBotValue} /></td>
                  <td>{item?.id?.split("_")[0]}</td>
                  <td>{item?.id?.split("_")[1]}</td>
                  <td>{item?.controller_name}</td>
                  <td>{item?.controller_type}</td>
                  <td>{item?.connector_name}</td>
                  <td>{item?.trading_pair}</td>
                  <td>{item?.total_amount_quote}</td>
                  <td>{item?.controller_type}</td>
                  <td>{item?.stop_loss}</td>
                  <td>{item?.take_profit}</td>
                  <td>{item?.time_limit}</td>
                </tr>)}

              </tbody>
            </table>
          </div>
        </Card>
      </div>
    
    </div>
    

  );
}

export default Configurations;
