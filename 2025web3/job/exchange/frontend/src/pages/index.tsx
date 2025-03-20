import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Typography ,Button} from '@mui/material'



export default function Home() {
  return (
    <div>
      <Typography>home</Typography>
         <Button>button</Button>
         <Button variant="contained">Contained</Button>
        <ConnectButton />
    </div>
  );
}
