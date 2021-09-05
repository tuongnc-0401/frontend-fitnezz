import React from "react";
import Calculator from "./component/Calculator/Calculator";
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import Ingredients from "./component/Ingredients/Ingredients";
import NavBar from "./component/NavBar/NavBar";
import OrderDetails from "./component/OrderDetails/OrderDetails";
import Payment from "./component/Payment/Payment";
import PlaceOrder from "./component/PlaceOrder/PlaceOrder";
import ProductDetail from "./component/Products/Product/ProductDetail/ProductDetail";
import Products from "./component/Products/Products";
import OrderHistory from "./component/Profile/OrderHistory/OrderHistory";
import UserProfile from "./component/Profile/UserProfile/UserProfile";
import Register from "./component/Register/Register";
import AdminRoute from "./component/Routes/AdminRoute";
import PrivateRoute from "./component/Routes/PrivateRoute";
import Shipping from "./component/Shipping/Shipping";
import SignIn from "./component/SignIn/SignIn";
import Admin from "./componentAdmin/AdminDashboard/Admin";
import AdminProduct from "./componentAdmin/AdminDashboard/AdminProduct/AdminProduct";
import CreateProduct from "./componentAdmin/Products/CreateProduct/CreateProduct";
import { Route, Switch, useLocation } from "react-router-dom";
import UpdateProduct from "./componentAdmin/Products/UpdateProduct/UpdateProduct";
import UpdateIngredient from "./componentAdmin/Ingredients/UpdateIngredient/UpdateIngredient";
import CreateIngredient from "./componentAdmin/Ingredients/CreateIngredient/CreateIngredient";
import AdminIngredient from "./componentAdmin/AdminDashboard/AdminIngredient/AdminIngredient";
import FitnessVideo from "./component/FitnessVideo/FitnessVideo";
import FitnessVideoDetail from "./component/FitnessVideo/FitnessVideoDetail/FitnessVideoDetail";
import Footer from "./component/Footer/Footer";
import AboutUs from "./component/About-Us/AboutUs";
import AdminProgram from "./componentAdmin/AdminProgram/AdminProgram";
import AdminProgramCreate from './componentAdmin/Programs/CreateProgram/CreateProgram';
import AdminProgramUpdate from './componentAdmin/Programs/UpdateProgram/UpdateProgram';
import AdminOrder from "./componentAdmin/AdminDashboard/AdminOrder/AdminOrder";
import UpdateOrder from "./componentAdmin/Orders/UpdateOrder/UpdateOrder";
import AdminUser from "./componentAdmin/AdminDashboard/AdminUser/AdminUser";
import CreateUser from "./componentAdmin/Users/CreateUser/CreateUser";
import UpdateUser from "./componentAdmin/Users/UpdateUser/UpdateUser";
import HealthHistory from "./component/Profile/HealthHistory/HealthHistory";
import AdminMeal from "./componentAdmin/AdminDashboard/AdminMeal/AdminMeal";
import CreateMeal from "./componentAdmin/Meals/CreateMeal/CreateMeal";
import UpdateMeal from "./componentAdmin/Meals/UpdateMeal/UpdateMeal";

import Recipe from "./component/Recipe/Recipe";


import Meals from "./component/Meals/Meals";


const AppRoute = () => {
  const location = useLocation();
  return (
    <div className="App">
      {!location.pathname.includes("/admin") && <NavBar />}
      <div style={{ minHeight: "75vh" }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Products} />
          <Route path="/product/:id" exact component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/register" exact component={Register} />
          <Route path="/shipping" exact component={Shipping} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/placeorder" exact component={PlaceOrder} />
          <Route path="/userprofile" exact component={UserProfile} />
          <Route path="/order/:id" exact component={OrderDetails} />
          <Route path="/orderhistory" exact component={OrderHistory} />
          <Route path="/healthhistory" exact component={HealthHistory} />
          <Route path="/aboutus" exact component={AboutUs} />
          <PrivateRoute path="/recipe/:id" exact component={Recipe} />
          <PrivateRoute path="/meals" component={Meals} />

          <PrivateRoute path="/ingredients" exact component={Ingredients} />
          <PrivateRoute path="/videos" exact component={FitnessVideo} />
          <PrivateRoute path="/videos/:id" component={FitnessVideoDetail} />
          <PrivateRoute
            path="/calculator"
            exact
            component={Calculator}
          ></PrivateRoute>

          <AdminRoute path="/admin" exact component={Admin} />
          <AdminRoute
            path="/admin/product/create"
            exact
            component={CreateProduct}
          />
          <AdminRoute path="/admin/product" exact component={AdminProduct} />
          <AdminRoute
            path="/admin/product/:id"
            exact
            component={UpdateProduct}
          />

          <AdminRoute
            path="/admin/ingredient/create"
            exact
            component={CreateIngredient}
          />
          <AdminRoute
            path="/admin/ingredient"
            exact
            component={AdminIngredient}
          />
          <AdminRoute
            path="/admin/ingredient/:id"
            exact
            component={UpdateIngredient}
          />
          <AdminRoute
            path="/admin/videos/create"
            exact
            component={AdminProgramCreate}
          />
          <AdminRoute path="/admin/videos" exact component={AdminProgram} />
          <AdminRoute path="/admin/videos/:id" exact component={AdminProgramUpdate} />
          <AdminRoute
            path="/admin/meal"
            exact
            component={AdminMeal}
          />
          <AdminRoute
            path="/admin/meal/create"
            exact
            component={CreateMeal}
          />
          <AdminRoute
            path="/admin/meal/:id"
            exact
            component={UpdateMeal}
          />
          <AdminRoute path="/admin/order" exact component={AdminOrder} />
          <AdminRoute path="/admin/order/:id" exact component={UpdateOrder} />
          <AdminRoute path="/admin/user" exact component={AdminUser} />
          <AdminRoute path="/admin/user/create" exact component={CreateUser} />
          <AdminRoute path="/admin/user/:id" exact component={UpdateUser} />
        </Switch>
      </div>
      {location.pathname === "/" ||
        (location.pathname.includes("/admin") ? null : <Footer />)}
    </div>
  );
};

export default AppRoute;
