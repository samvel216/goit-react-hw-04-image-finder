import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './MoreButton/Button';

import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import styles from '../components/Loader/Loader.module.css';


export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [featchAnswer, setFeatchAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formAnswer, setFormAnswer] = useState([]);
  const [modal, setModal] = useState("");
  const [page, setPage] = useState(1);
  const [testInputValue, setTestInputValue] = useState("");
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
          setFormAnswer([...featchAnswer, ...users.hits])
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
  }, [inputValue, page, featchAnswer]);

  const onClose = () => {
    setModal("");
  }
  const nextPage = () => {
    setPage(page + 1);
    setFeatchAnswer(formAnswer)
  };
  const handleChange = event => {
    event.preventDefault();
    setTestInputValue(event.target.value);
  };
  const formSubmit = event => {
    event.preventDefault();
    setPage(1);
    setFormAnswer(featchAnswer);
    setInputValue(testInputValue);
    setFeatchAnswer([]);
  };
  const handleClick = event => {
    event.preventDefault();
    setModal(event.target.src)
  };

  return (
    <div className={styles.container}>

      <Searchbar
        value={testInputValue}
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