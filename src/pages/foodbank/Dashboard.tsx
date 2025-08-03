import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
}

interface Category {
  name: string;
  items: InventoryItem[];
}

interface FoodBankData {
  organization: string;
  address: string;
  coordinates: [number, number];
  categories: Category[];
}

interface AnalyticsData {
  monthlyUsage: Array<{
    month: string;
    totalItemsDistributed: number;
    fundsReceived: number;
  }>;
  peakHours: Array<{
    hour: string;
    demand: number;
  }>;
  topProducts: Array<{
    product: string;
    category: string;
    monthlyDemand: number;
    recommendedStock: number;
  }>;
}

const initialInventory: InventoryItem[] = [
  { name: 'Peanut Butter', quantity: 76, unit: 'jars' },
  { name: 'Bananas', quantity: 76, unit: 'lbs' },
  { name: 'Bottled Water', quantity: 11, unit: 'cases' },
  { name: 'Granola Bars', quantity: 67, unit: 'boxes' },
  { name: 'Diapers', quantity: 61, unit: 'packs' },
  { name: 'Tampons', quantity: 9, unit: 'boxes' },
  { name: 'Soap', quantity: 47, unit: 'bars' },
  { name: 'Instant Ramen', quantity: 18, unit: 'boxes' }
];

const demoData: FoodBankData = {
  organization: 'The Roberts Foundation - Food Distribution Center',
  address: '180 Redwood St #350, San Francisco, CA 94102',
  coordinates: [37.78103054422582, -122.4200077596358],
  categories: [
    {
      name: 'Pantry Staples',
      items: initialInventory
    }
  ]
};

const demoAnalytics: AnalyticsData = {
  monthlyUsage: [
    { month: 'Jan', totalItemsDistributed: 1200, fundsReceived: 5000 },
    { month: 'Feb', totalItemsDistributed: 1500, fundsReceived: 6000 },
    { month: 'Mar', totalItemsDistributed: 1800, fundsReceived: 7000 },
    { month: 'Apr', totalItemsDistributed: 2000, fundsReceived: 8000 },
    { month: 'May', totalItemsDistributed: 2200, fundsReceived: 9000 },
    { month: 'Jun', totalItemsDistributed: 2400, fundsReceived: 10000 }
  ],
  peakHours: [
    { hour: '9 AM', demand: 150 },
    { hour: '12 PM', demand: 300 },
    { hour: '3 PM', demand: 250 },
    { hour: '6 PM', demand: 200 },
    { hour: '9 PM', demand: 180 }
  ],
  topProducts: [
    { product: 'Diapers', category: 'Personal Care', monthlyDemand: 500, recommendedStock: 600 },
    { product: 'Bottled Water', category: 'Essentials', monthlyDemand: 400, recommendedStock: 500 },
    { product: 'Peanut Butter', category: 'Pantry', monthlyDemand: 350, recommendedStock: 450 },
    { product: 'Granola Bars', category: 'Snacks', monthlyDemand: 300, recommendedStock: 400 },
    { product: 'Soap', category: 'Personal Care', monthlyDemand: 250, recommendedStock: 350 }
  ]
};

import { ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(demoData.categories);
  const [editing, setEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const handleQuantityChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const newQuantity = parseInt(value) || 0;
    const newItems = [...categories[categoryIndex].items];
    newItems[itemIndex].quantity = newQuantity;
    
    const newCategories = [...categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      items: newItems
    };
    
    setCategories(newCategories);
  };

  const handleEditCategory = (category: Category) => {
    setEditing(true);
    setEditedCategory(category);
  };

  const handleSaveCategory = () => {
    setEditing(false);
    setEditedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{demoData.organization}</h1>
          <Button variant="ghost" onClick={() => navigate('/')}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  {editing && editedCategory === category ? (
                    <Button variant="default" onClick={handleSaveCategory}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => handleEditCategory(category)}>
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-4">
                        <span className="flex-1">{item.name}</span>
                        <Input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(categoryIndex, itemIndex, e.target.value)}
                          className="w-24"
                        />
                        <span className="ml-2">{item.unit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="distribution" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={demoAnalytics.monthlyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="totalItemsDistributed" name="Items Distributed" stroke="#8884d8" />
                      <Line type="monotone" dataKey="fundsReceived" name="Funds Received" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={demoAnalytics.peakHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="demand" name="Demand" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top 30 Products by Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demoAnalytics.topProducts.slice(0, 30).map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-medium">{product.product}</h3>
                          <p className="text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">Demand</p>
                            <p className="text-muted-foreground">{product.monthlyDemand} units/month</p>
                          </div>
                          <div>
                            <p className="font-medium">Recommended Stock</p>
                            <p className="text-muted-foreground">{product.recommendedStock} units</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Impact Statistics */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Impact Statistics</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Meals Served</CardTitle>
              <CardDescription>12,345</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Families Served</CardTitle>
              <CardDescription>856</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Items Distributed</CardTitle>
              <CardDescription>45,678</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
