import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component'; // Import the detail component

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' }, // Redirect to the weather component
  { path: 'weather', component: WeatherComponent },
  { path: 'detail/:id', component: CityDetailComponent }, // Define the detail route with a parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
