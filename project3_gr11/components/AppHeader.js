import React, { Component } from "react";
import { Header, Title, Left, Body, Right } from "native-base";

export class AppHeader extends Component {
   render() {
       return(
           <Header transparent style={{backgroundColor: "#87cefa"}}>
               <Left/>
               <Body style={{}}>
               <Title>Today's List</Title>
               </Body>
               <Right/>
           </Header>
       );
   }
}