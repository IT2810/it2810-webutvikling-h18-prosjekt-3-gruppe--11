import React, { Component } from "react";
import { Header, Title } from "native-base";

export class AppHeader extends Component {
   render() {
       return(
           <Header transparent style={{backgroundColor: "#f2c413"}}>
               <Title>Moren din sin liste</Title>
           </Header>
       );
   }
}