import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import HomePage from "@/pages/home-page";
import PlayersPage from "@/pages/players-page";
import ThreePointPage from "@/pages/three-point-page";
import DunkContestPage from "@/pages/dunk-contest-page";
import AllStarsPage from "@/pages/all-stars-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/players" component={PlayersPage} />
      <Route path="/three-point" component={ThreePointPage} />
      <Route path="/dunk-contest" component={DunkContestPage} />
      <Route path="/all-stars" component={AllStarsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;