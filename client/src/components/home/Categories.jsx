
import { Button, Table, TableBody, TableCell, TableHead, TableRow , styled} from "@mui/material";
import { Link,useSearchParams} from "react-router-dom";

import { categories } from "../../constants/data";

const styledTable = styled(Table)`
      border:1px solid rgba(224,224,224,1); 

`;

const styledButton = styled(Button)`
      margin:20px;
      width:85%;
      background:#6495ED;
      color:#fff;
      text-decoration:none;
`;

const StyledLink = styled(Link)`
   text-decoration:none;
   color:inherit;
`;
    
const Categories = () =>{

   const [searchaParams]=useSearchParams();
   const category = searchaParams.get('category');  // category from home page
    return(                                         // it will also get added in url as category-category_name
        <>
           <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }} >
                  <styledButton variant='contained'>CREATE BLOG</styledButton> 
           </Link>
           
           <styledTable>
             <TableHead>
                <TableRow>
                     <TableCell>
                         <StyledLink to='/'>
                               All Categories
                         </StyledLink>

                     </TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
                 {
                   categories.map(category=>(
                    <TableRow key={category.id}>
                    <TableCell>
                        <StyledLink to={`/?category=${category.type}`}>
                           {category.type}
                        </StyledLink>
                          
                    </TableCell>
                    </TableRow>
                   ))
                 }
                 
             </TableBody>
           </styledTable>
        </>
    )
}

export default Categories;