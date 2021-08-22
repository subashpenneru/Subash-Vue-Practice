import { ref } from 'vue';

const useAlert = (alertVisible = false) => {
  const alertIsVisible = ref(alertVisible);

  const showAlert = () => {
    alertIsVisible.value = true;
  };
  const hideAlert = () => {
    alertIsVisible.value = false;
  };

  return {
    alertIsVisible,
    showAlert,
    hideAlert
  };
};

export default useAlert;
