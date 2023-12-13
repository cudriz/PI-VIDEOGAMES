import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame } from "../../Redux/Actions/actions";

const Form = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const [generosSelec, setGenerosSelec] = useState([]);
  const [disableSub, setDisableSub] = useState(true);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
  ];

  const [state, setState] = useState({
    name: "",
    platforms: "",
    background_image: "",
    freleaseds: "",
    rating: "",
    description: "",
    genres: [],
  });

  const [error, setErrors] = useState({
    name: "Campo requerido",
    background_image: "Campo requerido img",
    description: "Descripción no válida",
    freleaseds: "Fecha no válida",
    platforms: "Plataformas no válidas",
    rating: "Rating no válido",
  });

  const validate = (state, name) => {
    let validName = /^[a-zA-Z\s]+$/;

    switch (name) {
      case "name":
        if (state.name === "") {
          setErrors({ ...error, name: "El campo es requerido" });
        } else if (state.name.length > 20) {
          setErrors({ ...error, name: "Es muy largo" });
        } else if (!validName.test(state.name)) {
          setErrors({
            ...error,
            name: "El nombre solo debe contener letras y espacios",
          });
        } else {
          setErrors({ ...error, name: "" });
        }
        break;
      case "background_image":
        if (state.background_image === "") {
          setErrors({
            ...error,
            background_image: "El campo es requerido img",
          });
        } else {
          setErrors({ ...error, background_image: "" });
        }
        break;
      case "description":
        if (state.description.length === 0)
          setErrors({ ...error, description: "Campo requerido" });
        else setErrors({ ...error, description: "" });
        break;
      case "freleaseds":
        if (!state.freleaseds)
          setErrors({ ...error, freleaseds: "Fecha no válida" });
        else setErrors({ ...error, freleaseds: "" });
        break;
      case "platforms":
        if (!state.platforms)
          setErrors({ ...error, platforms: "Plataformas no válidas" });
        else setErrors({ ...error, platforms: "" });
        break;
      case "rating":
        if (state.rating < 1 || state.rating > 5)
          setErrors({
            ...error,
            rating: "Rating no válido, debe estar entre 1 y 5",
          });
        else setErrors({ ...error, rating: "" });
        break;

      default:
        break;
    }
  };

  const disableSubmit = () => {
    console.log(state, "state ");
    const disableSubmit = !(
      state.name &&
      state.description.length > 0 &&
      state.background_image.length > 0 &&
      state.freleaseds.length > 0 &&
      state.platforms.length > 0 &&
      state.rating > 0 &&
      generosSelec.length > 0
    );
    return disableSubmit;
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (name === "genres") {
      if (type === "select-multiple") {
        const selectedOptions = Array.from(event.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setState({
          ...state,
          genres: selectedOptions,
        });
      }
      if (name === "freleaseds") {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (name === "genres") {
      } else {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
    validate({ ...state, [name]: value }, name);
    disableSubmit();
  };
  const handleGenres = (e) => {
    const genreValue = e.target.value;
    setState((prevState) => ({
      ...prevState,
      genres: [...prevState.genres, genreValue],
    }));
    setGenerosSelec((prevGeneros) => [...prevGeneros, genreValue]);
  };

  const eliminarGenero = (gen) => {
    setState((prevState) => ({
      ...prevState,
      genres: prevState.genres.filter((g) => g !== gen),
    }));
    setGenerosSelec((prevGeneros) => prevGeneros.filter((g) => g !== gen));
  };

  function validateForm(errors) {
    return Object.values(errors).every((error) => error === "");
  }
  function handleSubmit(e) {
    e.preventDefault();
    let state2 = {
      ...state,
      genres: generosSelec,
      platforms: [state.platforms],
    };
    console.log(state2, "state2 antes de post");
    if (validateForm(error)) {
      dispatch(postGame(state2));
    } else {
      alert("Hay errores aun");
    }

    setState({
      name: "",
      image: "",
      description: "",
      background_image: "",
      freleaseds: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    setGenerosSelec([]);
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          placeholder="Ej: Mario Karts "
          name="name"
          onChange={handleChange}
          type="text"
          value={state.name}
        />
        {error.name && <p>{error.name}</p>}

        <br />

        <label>Background Image:</label>

        <input
          placeholder="ingrese una imagen"
          name="background_image"
          onChange={handleChange}
          type="text"
          value={state.background_image}
        />
        {error.background_image && <p>{error.background_image}</p>}
        <br />

        <label>Description:</label>
        <input
          placeholder="Ej: informacion del juego "
          name="description"
          onChange={handleChange}
          type="text"
          value={state.description}
        />
        {error.description && <p>{error.description}</p>}

        <br />

        <label>Fecha releaseds:</label>
        <input
          placeholder="Ej: seleccionar la fecha "
          name="freleaseds"
          onChange={handleChange}
          type="date"
          value={state.freleaseds}
        />
        {error.freleaseds && <p>{error.freleaseds}</p>}

        <br />

        <label>Rating:</label>
        <input
          placeholder="seleccionar el rating (1 al 5)"
          name="rating"
          onChange={handleChange}
          type="number"
          max={5}
          min={1}
          value={state.rating}
        />
        {error.rating && <p>{error.rating}</p>}

        <br />

        <label>Platforms:</label>
        <select
          name="platforms"
          onChange={handleChange}
          value={state.platforms}
        >
          <option value="">Selecciona una plataforma</option>
          {platforms.map((platform, index) => (
            <option key={index} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        <br />

        <label>Genres:</label>
        <select
          placeholder="seleccionar el genero "
          name="genres"
          onChange={(e) => handleGenres(e)}
        >
          <option value="">Seleccionar los generos </option>
          {allGenres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        {/* */}
        <div>
          Generos seleccionados:
          <div>
            {generosSelec.length > 0 &&
              generosSelec.map((gen, index) => {
                return (
                  <span key={index}>
                    {gen}{" "}
                    <button
                      type="button"
                      onClick={() => eliminarGenero(gen)}
                      style={{
                        width: "20px",
                        height: "30px",
                        margin: "auto 10px",
                      }}
                    >
                      X
                    </button>
                  </span>
                );
              })}
          </div>
        </div>

        <button disabled={disableSubmit()} type="submit">
          Entregar
        </button>
      </form>
    </div>
  );
};

export default Form;
