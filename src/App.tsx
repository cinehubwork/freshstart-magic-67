
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoffeeShops from "./pages/CoffeeShops";
import Restaurants from "./pages/Restaurants";
import Favorites from "./pages/Favorites";
import CoffeeDetails from "./pages/CoffeeDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/coffee" element={<CoffeeShops />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
