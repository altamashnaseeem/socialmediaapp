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
  const [startupNews, setStartupNews] = useState([]);
  console.log("startup::",startupNews)
  useEffect(()=>{

  const fetchStartupNews = async () => {
    try {
      const {data} = await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3ee5a7461729484694efd144699b0922")
       
      
      
      setStartupNews(data.articles); // Assuming 'articles' is the array of news articles in the response
    } catch (error) {
      console.error('Error fetching startup news:', error);
    }
  };

  fetchStartupNews();
  },[])

  return (
    <WidgetWrapper sx={{ position: 'sticky',
    top: 0,}}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500" sx={{paddingBottom:"1rem"}}>
        Top 10 Headlines with Startups
        </Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
    <Box sx={{overflow:"scroll",height:"30rem",overflowX: 'hidden'}} >
       {startupNews?.map((item)=>
          
          <List sx={{ listStyleType: 'disc' }}>
         <ListItem sx={{ display: 'list-item' }}  >
              
                <Link href={item.url} variant="h4" underline="none" target="_blank" >
                {item.title}
                </Link>
              
               
                
          </ListItem>
       </List>
          
       
       )}
    </Box>
         
     
    </WidgetWrapper>
  );
};

export default AdvertWidget;