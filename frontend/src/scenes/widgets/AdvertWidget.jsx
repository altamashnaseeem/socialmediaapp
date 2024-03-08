import { Typography, useTheme,Box,Link } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import axios from "axios"
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { BASE_URL } from "helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdvertWidget = () => {
  
   const navigate=useNavigate()
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [startupNew, setStartupNew] = useState([]);
  console.log("startup::",startupNew)
 
  useEffect(()=>{

  const fetchStartup = async () => {
    try {
      const {data} = await axios.get(`http://localhost:3001/api/new`)
       
      
      
      setStartupNew(data); // Assuming 'articles' is the array of news articles in the response
    } catch (error) {
      console.error('Error fetching startup news:', error);
    }
  };

  fetchStartup();
  },[])

  return (
    <WidgetWrapper sx={{ position: 'sticky',
    top: 0,}}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500" sx={{paddingBottom:"1rem"}}>
         Startup launching Products 
        </Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
    <Box sx={{overflow:"scroll",height:"30rem",overflowX: 'hidden'}} >
       {/* {startupNew?.map((item)=>
          
          <List sx={{ listStyleType: 'disc' }}>
         <ListItem sx={{ display: 'list-item',marginTop:"1rem" }}  >
              
                <Link href={item.imageUrl} variant="h5" underline="none" target="_blank" >
                <Typography variant="h4">
                  {item.title}
                </Typography>
                <Typography variant="h5" sx={{paddingTop:"0.5rem"}}>{item.description}</Typography>
                
                </Link>
              
               
                
          </ListItem>
       </List>
          
       
       )} */}
        <List>
          {startupNew.map((item, index) => (
            <ListItem key={index} sx={{ display: 'list-item' ,marginTop:"1rem"}}>
              {/* Prepend the index + 1 to act as the item number. Adjust styling as needed. */}
              <Typography variant="body1" component="span" sx={{ marginRight: "8px" }}>
                {index + 1}.
              </Typography>
              <Link href={item.imageUrl}  underline="none" target="_blank">
              <Typography variant="h4">
                  {item.title}
                </Typography>
                <Typography variant="h5" sx={{paddingTop:"0.5rem"}}>{item.description}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
    </Box>
         
     
    </WidgetWrapper>
  );
};

export default AdvertWidget;