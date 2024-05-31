import useAppByChecksum from "../hooks/useAppByChecksum";

function AppChecksum() {
  const app = useAppByChecksum(
    "0x45c5706c8bec1c23728fe15db32965539706b8488114d0293c2c5a25d094b0a5"
  );
  console.log("app", app);

  return <div>AppChecksum</div>;
}

export default AppChecksum;
