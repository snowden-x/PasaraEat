import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditItems from './components/CustomizeSiteComponents/EditItems'
import axios from 'axios';


export default function CustomizeSite() {

    
    const applychanges = async () => {
        try {
          // Make the POST request
          const result = await axios.post('http://192.168.56.1:8000/backend1/editables/',{
              'action': 'apply_changes',
          }
             , {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log(result.data)
          // Process the response
          console.log("done")
      } catch (error) {
          console.error('There was an error!', error);
      } 
    };



    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Customize Website
                </CardTitle>
                <h1 onClick={()=>{applychanges();}} style={{borderStyle:'solid', borderWidth:"3px", borderColor:"pink"}}>Apply Changes</h1>
            </CardHeader>
            <CardContent>
                    <>
                    <EditItems/>
                    </>
            </CardContent>
        </Card>
    )
}
