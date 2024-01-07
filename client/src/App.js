
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function App() {
  const modal = useSelector((state) => state.modal);

  return (
    <div className="container App">
      <Header/>
      <Body/>
      <Modal
        title={modal.title}
        text={modal.text}
        situation={modal.situation}
        button_close_text={modal.button_close_text}
        button_accept_text={modal.button_accept_text}
        icon={modal.icon}
      />
      <Toaster />
    </div>
  );
}

export default App;
