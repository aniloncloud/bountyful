"use client";

import { useState } from "react";
import { CrossSellMenuBuilder } from "@/components/restaurant/CrossSellMenuBuilder";
import { CrossSellAnalytics } from "@/components/restaurant/CrossSellAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CrossSellPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menu">Menu Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="space-y-6">
          <CrossSellMenuBuilder />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <CrossSellAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}