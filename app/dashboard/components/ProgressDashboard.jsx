import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target, Activity } from 'lucide-react';

const ProgressDashboard = () => {
  // Sample data - in real implementation would pull from APIs
  const financialData = [
    { week: 'W1', billableHours: 20, effectiveRate: 125, income: 2500 },
    { week: 'W2', billableHours: 25, effectiveRate: 130, income: 3250 },
    { week: 'W3', billableHours: 30, effectiveRate: 135, income: 4050 },
    { week: 'W4', billableHours: 28, effectiveRate: 140, income: 3920 },
  ];

  const projectMetrics = [
    { week: 'W1', completedTasks: 12, newLeads: 2, followUps: 3 },
    { week: 'W2', completedTasks: 15, newLeads: 3, followUps: 4 },
    { week: 'W3', completedTasks: 18, newLeads: 2, followUps: 5 },
    { week: 'W4', completedTasks: 14, newLeads: 4, followUps: 3 },
  ];

  return (
    <div className="w-full space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,920</div>
                <p className="text-xs text-muted-foreground">+20% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28h</div>
                <p className="text-xs text-muted-foreground">Target: 32h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 pending proposals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">Monthly goal</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="billableHours" stroke="#8884d8" name="Hours" />
                  <Line yAxisId="right" type="monotone" dataKey="effectiveRate" stroke="#82ca9d" name="Rate ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional tab contents would go here */}
      </Tabs>
    </div>
  );
};

export default ProgressDashboard;
