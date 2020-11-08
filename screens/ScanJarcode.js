import React from 'react';
import { StyleSheet } from 'react-native';

import {Layout, Text} from "@ui-kitten/components"; 


function ScanJarcode({navigation}) {

  return (
    
    <Layout style = {styles.container}> 
      <Text> JarCode Screen </Text>
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

export default ScanJarcode; 