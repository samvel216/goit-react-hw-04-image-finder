import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './MoreButton/Button';

import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import styles from '../components/Loader/Loader.module.css';


export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formAnswer, setFormAnswer] = useState([]);
  const [modal, setModal] = useState("");
  const [page, setPage] = useState(0);
  const [btnBull, setBtnBull] = useState(false);

  useEffect(() => {
    const perPage = 12;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=25829812-d39cfe0a6889efb95d5c21ab8&q=${inputValue}&webformatURL&largeImageURL&page=${page}&per_page=${perPage}&total`
        );
        const users = await response.json();
        if (page === 1) {
          setFormAnswer(users.hits);
          setBtnBull(true);
        }
        if (users.hits.length < perPage) {
          setBtnBull(false);
        }
        if (page > 1) {
          setFormAnswer([...formAnswer, ...users.hits])
          setBtnBull(true);
        }
        if (users.hits.length < 12) {
          setBtnBull(false);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    if (inputValue !== "") {
      fetchData();
    }
  }, [page]);

  const onClose = () => {
    setModal("");
  }
  const nextPage = () => {
    setPage(page + 1);
  };
  const handleChange = event => {
    event.preventDefault();
    setInputValue(event.target.value);
  };
  const formSubmit = event => {
    event.preventDefault();
    setFormAnswer([]);
    setPage(1);

  };
  const handleClick = event => {
    setModal(event.target.src)
  };

  return (
    <div className={styles.container}>

      <Searchbar
        value={inputValue}
        handleChange={handleChange}
        formSubmit={formSubmit}
      />
      {isLoading === true && <Loader />}
      <ImageGallery
        gallery={formAnswer}
        handleClick={handleClick}
      />
      {btnBull === true && (
        <Button nextPageFunk={nextPage} />
      )}
      {modal !== '' && (
        <Modal
          src={modal}
          onClose={onClose}
        />
      )}
    </div>
  );

}