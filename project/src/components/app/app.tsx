import MainScreen from '../main-screen/main-screen';

type propsTypes = {
  offersCount: number
};

function App({ offersCount }: propsTypes): JSX.Element {
  return <MainScreen offersCount={offersCount} />;
}

export default App;
