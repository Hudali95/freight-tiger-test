import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";

function Item(props) {
  console.log("pros", props);
  const { productName, images, productId } = props.item;
  const ItemWrapper = useRef(null);
  const placeHolder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.01,
      rootMargin: "25%",
    };
    let observer = new IntersectionObserver((el) => {
      if (el[0].isIntersecting && el[0].target.src === placeHolder) {
        return (el[0].target.src = el[0].target.getAttribute("data-src"));
      }
    }, options);
    if (ItemWrapper.current) observer.observe(ItemWrapper.current);
    return () => {
      if (ItemWrapper.current) observer.unobserve(ItemWrapper.current);
    };
  }, [ItemWrapper]);

  return (
    <div className="itemWrapper boxShadow">
      <div className="itemHeader commonPadding">{productName}</div>
      <div className="itemBody commonPadding">
        <div className="imageWrapper">
          <img
            className="image"
            data-src={images.filter((el) => el.view === "default")[0].src}
            src={placeHolder}
            alt={productName}
            ref={ItemWrapper}
          ></img>
        </div>
      </div>
      <div className="itemFooter commonPadding">
        <button
          className="actionButton boxShadow"
          onClick={() => props.addItemToCart(productId)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default connect(null, actions)(Item);
