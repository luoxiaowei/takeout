import { showAnimate, hideAnimate } from '../../../utils/util';
export default {
  cartHandleShow: function() {
    this.setData({
      cart: {
        ...this.data.cart,
        cartShow: true,
        $isAnimation: showAnimate()
      }
    });
  },
  cartHandleHide: function() {
    this.setData({
      cart: {
        ...this.data.cart,
        cartShow: false,
        $isAnimation: hideAnimate()
      }
    })
  },
  cartStop: function(e) {
    
  } 
}