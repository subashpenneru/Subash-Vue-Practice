export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0
    };
  },
  mutations: {
    addProductToCart(state, { id, title, image, price }) {
      const productInCartIndex = state.items.findIndex(
        ci => ci.productId === id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: id,
          title,
          image,
          price,
          qty: 1
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += price;
    },
    removeProductFromCart(state, { prodId }) {
      const productInCartIndex = state.items.findIndex(
        cartItem => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    }
  },
  actions: {
    addToCart(context, { id }) {
      const products = context.rootGetters['prods/products'];
      const product = products.find(prod => prod.id === id);

      context.commit('addProductToCart', product);
    },
    removeFromCart(context, payload) {
      context.commit('removeProductFromCart', payload);
    }
  },
  getters: {
    products(state) {
      return state.items;
    },
    totalSum(state) {
      return state.total;
    },
    quantity(state) {
      return state.qty;
    }
  }
};
