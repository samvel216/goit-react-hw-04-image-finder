import styles from './Modal.module.css';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ onClose, src }) => {
  useEffect(() => {
    window.addEventListener('keydown', keydown);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);
  const keydown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div
      className={styles.Overlay}
      onClick={handleBackdropClick}
    >
      <div className={styles.Modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};
export default Modal;
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
