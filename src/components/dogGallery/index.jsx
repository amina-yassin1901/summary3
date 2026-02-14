import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://dog.ceo/api/breeds/image/random";

function DogGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  async function fetchDog() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      setIsLoading(true);

      const dogs = await Promise.all([fetchDog(), fetchDog(), fetchDog()]);

      setImages(dogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addDog = async () => {
    try {
      setIsAdding(true);
      const newDog = await fetchDog();
      setImages((prev) => [...prev, newDog]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };
  const refreshAll = async () => {
    try {
      setIsRefreshing(true);

      const newDogs = await Promise.all(images.map(() => fetchDog()));

      setImages(newDogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const clearAll = () => {
    setImages([]);
  };
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div>
      <h2>Загружено собак: {images.length}</h2>

      <div>
        {images.map((img, index) => (
          <img key={index} src={img} alt="dog" width="200" height="200" />
        ))}
      </div>

      <button onClick={addDog}>Добавить собаку</button>

      <button onClick={refreshAll}>Обновить всё</button>

      <button onClick={clearAll}>Очистить все</button>
    </div>
  );
}
export default DogGallery;
