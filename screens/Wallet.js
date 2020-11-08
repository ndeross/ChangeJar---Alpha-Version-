import React from 'react';
import { StyleSheet } from 'react-native';

import {Layout, Text} from "@ui-kitten/components"; 


function Wallet({navigation}) {

  return (
    
    <Layout style = {styles.container}> 
      <Text> Wallet Screen </Text>
      </Layout>
    
   );
  }
   

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",

  },
});

export default Wallet; 