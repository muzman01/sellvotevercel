import { useContext } from "react";
import { DataContext } from "../../store/Globalstate";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{
            msg: notify.err,
            title: "Missing data or repetitive operation!",
          }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="red"
        />
      )}
      {notify.success && (
        <Toast
          msg={{
            msg: notify.success,
            title: "Transaction created, please confirm payment from wallet!",
          }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="green"
        />
      )}
    </>
  );
};

export default Notify;
