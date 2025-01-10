
import {Box,Typography,styled} from '@mui/material'

const Image = styled(Box)`
     background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
     width:100%;
     height:50vh;
     display:flex;
     align-items:center;
     justify-content:center;
     flex-direction:column;
`;

const Heading = styled(Typography)`
       font-sie:70px;
       color:#ffffff;
       line-height:1;
`; 

const SubHeading = styled(Typography)`
     font-size:20px;
     background:#ffffff;
`;

const Banner = () =>{
    return(
       <Image>
         <Heading>BLOG</Heading>
         <SubHeading>Code for india</SubHeading>
       </Image>

    )
}
export default Banner;