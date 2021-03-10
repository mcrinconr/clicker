import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFooter,
  listFooters } from '../actions/footerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  FOOTER_DELETE_RESET} from '../constants/footerConstants';

export default function FooterListScreen(props) {
  const footerList = useSelector((state) => state.footerList);
  const { loading, error, footers } = footerList;

  const footerDelete = useSelector((state) => state.footerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = footerDelete;

  const dispatch = useDispatch();
  useEffect(() => {

    if (successDelete) {
      dispatch({ type: FOOTER_DELETE_RESET });
    }
    dispatch(listFooters());
    }, [dispatch, props.history, successDelete]);

    const deleteHandler = (footer) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteFooter(footer._id));
      }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
        <h3>EDITA TU PIE DE PÁGINA</h3>
        </div>
      </div>


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
              <th>NOSOTROS</th>
              <th>ENLACES</th>
              <th>REDES SOCIALES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {footers.map((footer) => (
              <tr key={footer._id}>
                <td>{footer.nosotrosParrafo}</td>
                <td>{footer.enlace1}</td>
                <td>{footer.social1}</td>
                <td>
                <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() =>
                      props.history.push(`/footer/${footer._id}/edit`)
                    }
                  >
                    Editar
                  </button>
                  </div>
                  <div className="col-md-6">
                  <button
                    type="button"
                    className="small btn btn-secondary"
                    onClick={() => deleteHandler(footer)}
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
