import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import * as actions from "../Redux/actions";

import Item from "./Item";

function Dashboard(props) {
  const containerRef = useRef(null);
  useEffect(() => {
    const getItems = async (from, to) => {
      await props.getItems(from, to);
    };

    let observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          if (!props.reachedEnd) getItems(props.from, props.to);
        }
      },
      {
        root: null,
        rootMargin: "5px",
        threshold: 1,
      }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, props]);

  return (
    <div className="dashboardWrapper">
      <div className="itemsContainer">
        {props.products.length > 0 &&
          props.products.map((el) => <Item item={el} />)}
      </div>
      <div ref={containerRef} className="spinnerWrapper">
        {props.reachedEnd ? (
          "No more results to show..."
        ) : (
          <ImSpinner2 className="spinner" />
        )}
      </div>
    </div>
  );
}
const mapStatesToProps = (state) => {
  return {
    products: state.items,
    from: state.limit.from,
    to: state.limit.to,
    reachedEnd: state.reachedEnd,
  };
};
export default connect(mapStatesToProps, actions)(Dashboard);
