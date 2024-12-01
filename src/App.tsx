import { PageMessage } from './components/PageMessage';
import { ImagePageMessage } from './domain/page-message';
import { usePageMessages } from './hooks/usePageMessages';

function App() {
  // This LandBot URL could come from any source: a configuration file, a database, an env variable…
  const { messages, isLoading } = usePageMessages(
    `https://landbot.online/v3/H-2700320-PXW3AL3F5TEP48CR/index.json`
  );

  if (isLoading) return null;

  const lastImageIndex = messages.findLastIndex((msg) => msg.type === 'image');
  const lastImage = messages[lastImageIndex] as ImagePageMessage;
  const rest = messages.slice(lastImageIndex + 1);

  return (
    <div className="h-full flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8">
        <h1 className="text-4xl font-bold text-orange-950 text-center">
          👧🏻 👱🏻‍♀️ ¡Yuju! Príncipe Azul, ¿dónde estás? 🤴🏻
        </h1>
        <div className="h-[55%] w-[95%] border rounded-md bg-white p-4 shadow-lg flex flex-col gap-8 md:flex-row relative bg-gradient-to-r from-white via-amber-50 to-white">
          <div
            data-testid="image-container"
            className="flex flex-col items-center flex-1 bg-cover bg-center"
            style={{
              backgroundImage: `url(${lastImage ? lastImage.imageUrl : '/cuartoprincesas.png'})`
            }}
          />

          <div className="bg-slate-200 h-full w-[1px] absolute top-0 bottom-0 left-[50%] hidden md:block" />

          <div className="flex flex-col gap-4 flex-1 max-h-full overflow-y-auto">
            {rest.map((msg, index) => (
              <PageMessage key={index} page={msg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
