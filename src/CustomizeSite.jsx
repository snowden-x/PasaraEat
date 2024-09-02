import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditItems from './components/CustomizeSiteComponents/EditItems'


export default function CustomizeSite() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Customize Website
                </CardTitle>
            </CardHeader>
            <CardContent>
                    <>
                        <EditItems/>
                    </>
            </CardContent>
        </Card>
    )
}
