import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNavbar,
  listNavbars } from '../actions/navbarActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  NAVBAR_DELETE_RESET} from '../constants/navbarConstants';

export default function NavbarListScreen(props) {
  const navbarList = useSelector((state) => state.navbarList);
  const { loading, error, navbars } = navbarList;

  const navbarDelete = useSelector((state) => state.navbarDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = navbarDelete;

  const dispatch = useDispatch();
  useEffect(() => {

    if (successDelete) {
      dispatch({ type: NAVBAR_DELETE_RESET });
    }
    dispatch(listNavbars());
    }, [dispatch, props.history, successDelete]);

    const deleteHandler = (navbar) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteNavbar(navbar._id));
      }
  };
  return (
    <div className="container">
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NOMBRE DE TU EMPRESA</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {navbars.map((navbar) => (
              <tr key={navbar._id}>
                <td>{navbar.nombre}</td>
                <td>
                <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/navbar/${navbar._id}/edit`)
                    }
                  >
                    Editar
                  </button>
                  </div>
                  <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() => deleteHandler(navbar)}
                  >
                    Eliminar
                  </button>
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
