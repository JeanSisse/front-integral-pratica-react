import { useState } from 'react';
import IMAGENS from './images';

function Button(props) {
  return (
    <button
      className="menu-hamburguer"
      onClick={props.openMenu}
    >
      <img src={props.img} alt={props.alt} />
    </button>
  )
}

function ButtonName(props) {
  return (
    <span 
      style={{display: props.menuState ? 'flex' : 'none'}}
      className={`menu__item--name font-roboto bold-font normal-style 
      ${props.nome === 'Início' ? 'cor-branca' : ''}`}
    >
        {props.nome}
    </span>
  )
}

function MenuNavigation() {
  const [menuAberto, setmenuAberto] = useState(false);

  const closeMenu = 'assets/close-menu.svg';

  function handleMenuHamburger(event) {
    const modalState = !menuAberto;
    setmenuAberto(modalState);
  }

  const MENUS = [
    {
      id:0,
      src: "assets/closed-menu.svg",
      nome: "menu hamburguer"
    },
    {
      id: 1,
      src: "assets/active-home.svg",
      nome: "Início"
    },
    {
      id: 2,
      src: "assets/inactive-like.svg",
      nome: "Favorito"
    }
  ]

  return (
    <nav className={menuAberto ? "menu-modal" : "menu-lateral"}>
      <ul className="menu">
        {
          MENUS.map(menu => {
            return (
              <li key={menu.id} className="menu__item">
                
                {
                  menu.nome !== "menu hamburguer" ?
                    <Button
                      img={menu.src}
                      alt={menu.nome}
                      openMenu={handleMenuHamburger}
                    />
                  :
                    <Button 
                      img={menuAberto ? closeMenu : menu.src}
                      alt={menu.nome}
                      openMenu={handleMenuHamburger}
                    />
                }
                {
                  menu.nome !== "menu hamburguer" ? 
                    <ButtonName
                      nome={menu.nome}
                      menuState={menuAberto}
                    />
                  :
                    ""
                }
              </li>
            )
          })
        }
      </ul>

      <div className="menu__item">
          <Button
              img="assets/inactive-settings.svg" 
              alt="configurações"
          />
          <ButtonName 
            nome="Configurações"
            menuState={menuAberto}
          />
      </div>
    </nav>
  )
}

function ImgToGalery(props) {
  return (
    <div className="img">
      <img
        src={props.imgToGalety}
        className="imgs-galeria" alt={props.altGalery}
        onClick={props.handleModal}
      />
      <img src={props.likeImg} className={`galeria-like ${props.like ? '' : 'display-none'}`} alt={props.likeAlt} />

      <div className="img__footer font-roboto light-font normal-style">
        <h4>
          {props.children}
        </h4>
        <span>{props.message}</span>
      </div>
    </div>
  )
}

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState();
  const [imgIndex, setImgIndex] = useState(0);
  const [like, setLike] = useState(false);

  function handleModal({ src, index }) {
    const modalState = !openModal;
    const arrayImgs = [...IMAGENS];
    const likeState = arrayImgs.find(indexOfImg => indexOfImg.id === index && indexOfImg.like);

    likeState ? setLike(likeState.like) : setLike(false);
    setOpenModal(modalState);
    setModalSrc(src);
    setImgIndex(index);
  }

  function handleLikes(event) {
    event.stopPropagation();

    const likeState = !like;
    const indexOfImg = imgIndex - 1;
    
    IMAGENS[indexOfImg].like = likeState;

    setLike(likeState);
  }

  return (
    <div className="App container">
      <MenuNavigation />

      <main className="main">
        <h1 className="titulo font-roboto bold-font normal-style">Início</h1>

        <div className="galeria">
          {
            IMAGENS.map(img => 
              <ImgToGalery 
                key={img.id}
                imgToGalety={img.src}
                altGalery={img.alt}
                likeImg="assets/like.svg"
                likeAlt="like"
                like={img.like}
                message="há 1 mês"
                handleModal={() => handleModal({src: img.src, index: img.id})}
              >
                {img.title}
              </ImgToGalery>
            )
          }
          
        </div>

        <div
          className="modal"
          style={{display: openModal ? 'flex' : 'none'}}
          onClick={handleModal}
        >
          <img
            id="close-modal"
            src="assets/close-modal.svg" alt="fechar modal"
            onClick={handleModal}
          />
          <div className="img-navegacao">
            <img
              id="prev"
              className={(imgIndex - 1) > 0 ? '' : "display-none"}
              src="assets/prev.svg" alt="prev"
            />
            <img
              id="img-modal-atual" alt=""
              src={modalSrc}
              onClick={(event) => event.stopPropagation()}
              onDoubleClick={handleLikes}
            />
            <img
              src="assets/like.svg" alt="like"
              className={`modal-like ${like ? '' : 'display-none'}`}
            />
            <img
              id="next"
              className={imgIndex < IMAGENS.length ? '' : "display-none"}
              src="assets/next.svg" alt="next"
            />
          </div> 
        </div> 
      </main>
    </div>
  );
}

export default App;
