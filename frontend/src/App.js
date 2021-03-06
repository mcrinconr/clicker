import React, { useEffect, useState }  from 'react';
import {
    Collapse,
    Dropdown,
    Nav,
    Button,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import HighlightListScreen from './screens/HighlightListScreen';
import HighlightEditScreen from './screens/HighlightEditScreen';
import InsightListScreen from './screens/InsightListScreen';
import InsightEditScreen from './screens/InsightEditScreen';
import Footer from './components/Footer';
import { listFooters } from './actions/footerActions';
import FooterListScreen from './screens/FooterListScreen';
import FooterEditScreen from './screens/FooterEditScreen';
import Navebar from './components/Navbar';
import { listNavbars } from './actions/navbarActions';
import NavbarListScreen from './screens/NavbarListScreen';
import NavbarEditScreen from './screens/NavbarEditScreen';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggler = () => setDropdownOpen(prevState => !prevState);

  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggler2 = () => setDropdownOpen2(prevState => !prevState);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const footerList = useSelector((state) => state.footerList);
  const {
    loading: loadingFooters,
    error:errorFooters,
    footers,
  } = footerList;

  const navbarList = useSelector((state) => state.navbarList);
  const {
    loading: loadingNavbars,
    error:errorNavbars,
    navbars,
  } = navbarList;

  useEffect(() => {
    dispatch(listProductCategories());
    dispatch(listFooters());
    dispatch(listNavbars());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Nav className="navbar fixed-top navbar-expand-lg navbar-light fixed-top">
          <Button
            onClick={toggle}
            className="navbar-toggler"
            type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <a className="navbar-brand ml-auto" href="/">
          {loadingNavbars ? (
              <LoadingBox></LoadingBox>
            ) : errorNavbars ? (
              <MessageBox variant="danger">{errorNavbars}</MessageBox>
            ) : (
              <>
                {navbars.length === 0 && <MessageBox>No navbar Found</MessageBox>}
                  {navbars.map((navbar) => (
                    <Navebar key={navbar._id} navbar={navbar}></Navebar>
                  ))}
              </>
            )}
          </a>
          <Collapse isOpen={isOpen} className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                  categories.map((c) => (
                    <li className="nav-link" key={c}>
                      <Link
                        to={`/search/category/${c}`}
                      >
                        {c}
                      </Link>
                    </li>
                  ))
                )}
              {userInfo && userInfo.isAdmin && (
                <Dropdown caret isOpen={dropdownOpen} toggle={toggler} className="nav-item dropdown">
                  <DropdownToggle tag="text" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu" color="link" aria-labelledby="navbarDropdown">
                    <DropdownItem>
                      <Link to="/productlist">Products</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/orderlist">Orders</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/userlist">Users</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/highlightlist">Highlights</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/insightlist">Insights</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/footerlist">Footer</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/navbarlist">Navbar</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </ul>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
            {userInfo ? (
              <li>
              <Dropdown caret isOpen={dropdownOpen2} toggle={toggler2} className="nav-item dropdown">
                <DropdownToggle tag="text"  className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {userInfo.name}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <DropdownItem className="dropdown-item">
                    <Link to="/profile">User Profile</Link>
                  </DropdownItem>
                  <DropdownItem className="dropdown-item">
                    <Link to="/orderhistory">Order History</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="dropdown-item">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              </li>
              ) : (
              <li className="nav-item active">
                <Link to="/signin"><i class="far fa-user fa-2x"></i></Link>
              </li>
            )}
            </ul>
          </Collapse>
          <form class="form-inline ml-auto">
              <Link to="/cart">
                <i className="fas fa-cart-plus fa-2x"></i>
                {cartItems.length > 0 && (
                  <span>{cartItems.length}</span>
                )}
              </Link>
          </form>
          </Nav>
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/productlist/pageNumber/:pageNumber"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <AdminRoute
              path="/highlightlist"
              component={HighlightListScreen}
            ></AdminRoute>
            <Route
              path="/highlight/:id/edit"
              component={HighlightEditScreen}
              exact
            ></Route>
            <AdminRoute
              path="/insightlist"
              component={InsightListScreen}
            ></AdminRoute>
            <Route
              path="/insight/:id/edit"
              component={InsightEditScreen}
              exact
            ></Route>
            <AdminRoute
              path="/footerlist"
              component={FooterListScreen}
            ></AdminRoute>
            <Route
              path="/footer/:id/edit"
              component={FooterEditScreen}
              exact
            ></Route>
            <AdminRoute
              path="/navbarlist"
              component={NavbarListScreen}
            ></AdminRoute>
            <Route
              path="/navbar/:id/edit"
              component={NavbarEditScreen}
              exact
            ></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
          {loadingFooters ? (
            <LoadingBox></LoadingBox>
          ) : errorFooters ? (
            <MessageBox variant="danger">{errorFooters}</MessageBox>
          ) : (
            <>
              {footers.length === 0 && <MessageBox>No footer Found</MessageBox>}
                {footers.map((footer) => (
                  <Footer key={footer._id} footer={footer}></Footer>
                ))}
            </>
          )}
      </div>
    </BrowserRouter>
  );
}

export default App;
