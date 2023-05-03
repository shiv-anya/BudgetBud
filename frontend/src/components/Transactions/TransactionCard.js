import React, { useContext, useState } from "react";
import classes from "./TransactionCard.module.css";
import {
  FaPenSquare,
  FaTrash,
  FaShoppingCart,
  FaUtensils,
  FaIcons,
  FaTshirt,
  FaBus,
  FaFileInvoice,
  FaNotesMedical,
} from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const TransactionCard = (props) => {
  const ctx = useContext(AuthContext);
  const deleteHandler = (e) => {
    axios
      .delete(`${process.env.REACT_BASE_URL}/${ctx.userId}/delete/${props.id}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  let icon;
  switch (props.tag) {
    case "entertainment":
      icon = <FaIcons />;
      break;
    case "food":
      icon = <FaUtensils />;
      break;
    case "clothing":
      icon = <FaTshirt />;
      break;
    case "transportation":
      icon = <FaBus />;
      break;
    case "bills":
      icon = <FaFileInvoice />;
      break;
    case "health":
      icon = <FaNotesMedical />;
      break;

    default:
      icon = <FaShoppingCart />;
  }
  const [actionsVisible, setActionVisible] = useState(false);
  const showActions = () => {
    setActionVisible(true);
  };
  const hideActions = () => {
    setActionVisible(false);
  };
  return (
    <div
      className={classes.card}
      onMouseEnter={showActions}
      onMouseLeave={hideActions}
    >
      <div className={classes.icon}>{icon}</div>
      <div className={classes.info}>
        <div className={classes.title}>
          <h3>{props.title}</h3>
          <p>{props.tag}</p>
        </div>
        <div className={classes.price}>
          <h3>${props.amount}</h3>
          <p>{moment(props.date).format("LL")}</p>
        </div>
        {actionsVisible && (
          <div className={classes.actions}>
            <Link to={`/update/${props.id}`}>
              <FaPenSquare className={classes.blue} />
            </Link>
            <FaTrash className={classes.red} onClick={deleteHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
