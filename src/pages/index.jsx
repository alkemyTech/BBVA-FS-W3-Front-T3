import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const Page = (props) => {
    return (
      <>
        <Header/>
        <div>{props.children}</div>
        <Footer />
      </>
    )
  }
  
  export default Page;